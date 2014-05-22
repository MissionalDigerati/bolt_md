<?php
// Related Sort Extension for Bolt
// Minimum version: 0.7

namespace ClassManager;

use Symfony\Component\HttpFoundation\Response;

/**
 * ClassManager is an Extension for the Bolt CMS (@link http://bolt.cm)
 *
 * @package default
 * @author Johnathan Pulos
 **/
class Extension extends \Bolt\BaseExtension
{
    /**
     * The prefix path for all urls based on the branding url
     *
     * @var string
     * @access private
     **/
    private $brandingPath;

    /**
     * Setup information about the extension
     *
     * @return array
     * @access public
     * @author Johnathan Pulos
     **/
    public function info()
    {
        $data = array(
            'name' =>"Class Manager",
            'description' => "A custom extension to manage traning classes.",
            'author' => "Missional Digerati",
            'link' => "http://www.missionaldigerati.org",
            'version' => "1.1",
            'required_bolt_version' => "1.0",
            'highest_bolt_version' => "1.0",
            'type' => "Backend Extension",
            'first_releasedate' => "2014-04-16",
            'latest_releasedate' => "2014-04-16",
        );

        return $data;
    }

    /**
     * initialize the extension
     *
     * @return void
     * @author Johnathan Pulos
     **/
    public function initialize()
    {
        $this->config = $this->getConfig();
        $this->brandingPath = $this->app['config']->get('general/branding/path');

        /**
         * ensure proper config
         */
        if (!isset($this->config['permissions']) || !is_array($this->config['permissions'])) {
            $this->config['permissions'] = array('root', 'admin', 'developer');
        } else {
            $this->config['permissions'][] = 'root';
        }

        // check if user has allowed role(s)
        $currentUser    = $this->app['users']->getCurrentUser();
        $currentUserId  = $currentUser['id'];

        foreach ($this->config['permissions'] as $role) {
            if ($this->app['users']->hasRole($currentUserId, $role)) {
                $this->authorized = true;
                break;
            }
        }

        if ($this->authorized) {
            /**
             * Add the button in the extensions navigation
             */
            $this->path = $this->brandingPath . '/extensions/class-manager';
            $this->app->match($this->path, array($this, 'classManagerLoad'));
            $this->addMenuOption(__('Manage Classes'), $this->app['paths']['bolt'] . 'extensions/class-manager', "icon-group");
        }
        /**
         * Add the clickable links for this page
         */
        $attendancePath = $this->path = $this->brandingPath . '/extensions/class-manager/attendance/';
        $this->app->match($attendancePath . "{class_slug}/{id}", array($this, 'classManagerLoadAttendance'));
        /**
         * Add ClassManager template namespace to twig
         */
        $this->app['twig.loader.filesystem']->addPath(__DIR__.'/views/', 'ClassManager');
    }

    /**
     * Load the ClassManager Response
     *
     * @return Response \Symfony\Component\HttpFoundation\JsonResponse
     * @access public
     * @author Johnathan Pulos
     **/
    public function classManagerLoad()
    {
        $classes = $this->app['storage']->getContent('upcoming_classes', array('order' => 'date_of_class DESC'));

        /**
         * Add the clickable links for this page
         */
        $attendancePath = $this->path = $this->brandingPath . '/extensions/class-manager/attendance/';

        $body = $this->app['render']->render('@ClassManager/base.twig',
            array(
                'classes'           =>  $classes,
                'attendance_path'   =>  $attendancePath
            )
        );

        return new Response($this->injectAssets($body));
    }

    /**
     * Load the Attendance Page for the class
     *
     * @param integer $id the id of the class to retrieve attendance for
     * @return Response \Symfony\Component\HttpFoundation\JsonResponse
     * @access private
     * @author Johnathan Pulos
     **/
    public function classManagerLoadAttendance($class_slug = '', $id = null)
    {
        $id = (int) $id;
        switch ($class_slug) {
            case 'faith_and_tech':
                $table = 'form_register_faith_tech';
                $view = 'ft_attendance.twig';
                break;
            case 'digerati_101':
                $table = 'form_register_digerati_101';
                $view = 'digerati_attendance.twig';
                break;
            default:
                $table = 'form_register_faith_tech';
                $view = 'ft_attendance.twig';
                break;
        }
        $sql = "Select * FROM $table WHERE class_id = ? ORDER BY timestamp DESC";
        $students = $this->app['db']->fetchAll($sql, array($id));

        foreach ($students as $key => $value) {
            $students[$key]['phone'] = $this->formatPhoneNumber($students[$key]['phone']);
        }

        $classRecord = $this->app['storage']->getContent('upcoming_classes', array('id' => $id, 'returnsingle' => true));

        $body = $this->app['render']->render("@ClassManager/$view",
            array(
                'students'      =>  $students,
                'class_record'  =>  $classRecord
            )
        );

        return new Response($this->injectAssets($body));
    }

    /**
     * Formats a phone number for better display.
     *
     * @link http://stackoverflow.com/a/6604465
     *
     * @param string $number The number to format.
     * @return string The proper formatted number.
     * @access private
     * @author Johnathan Pulos
     **/
    private function formatPhoneNumber($number)
    {
        $cleanedNumber = preg_replace("/[^0-9]/", "", $number);
        return preg_replace('~.*(\d{3})[^\d]*(\d{3})[^\d]*(\d{4}).*~', '($1) $2-$3', $cleanedNumber);
    }

    /**
     * Injects the assets into the head tag
     *
     * @param string $html the HTML to replace
     * @return mixed
     * @access private
     * @author Johnathan Pulos
     **/
    private function injectAssets($html)
    {
        $urlbase = $this->app['paths']['app'];

        $assets = '<link rel="stylesheet" href="{urlbase}/extensions/ClassManager/assets/print.css">';

        $assets = preg_replace('~\{urlbase\}~', $urlbase, $assets);

        // Insert just before </head>
        preg_match("~^([ \t]*)</head~mi", $html, $matches);
        $replacement = sprintf("%s\t%s\n%s", $matches[1], $assets, $matches[0]);
        return str_replace_first($matches[0], $replacement, $html);
    }

}
