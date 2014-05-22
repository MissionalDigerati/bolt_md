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
            $this->path = $this->app['config']->get('general/branding/path') . '/extensions/class-manager';
            $this->app->match($this->path, array($this, 'classManagerLoad'));
            $this->addMenuOption(__('Manage Classes'), $this->app['paths']['bolt'] . 'extensions/class-manager', "icon-group");
        }
    }

    /**
     * Load the ClassManager Response
     *
     * @return Response|\Symfony\Component\HttpFoundation\JsonResponse
     * @access public
     * @author Johnathan Pulos
     **/
    public function classManagerLoad()
    {
        /**
         * Add ClassManager template namespace to twig
         */
        $this->app['twig.loader.filesystem']->addPath(__DIR__.'/views/', 'ClassManager');

        $classes = $this->app['storage']->getContent('upcoming_classes', array('order' => 'date_of_class DESC'));

        $body = $this->app['render']->render('@ClassManager/base.twig',
            array(
                'classes'   =>  $classes
            )
        );

        return new Response($body);
    }

}
