<?php
// GamifyClasses Extension for Bolt
// Minimum version: 0.7

namespace GamifyClasses;

use Symfony\Component\HttpFoundation\Request;

/**
 * GamifyClasses is an Extension for the Bolt CMS (@link http://bolt.cm)
 *
 * @package default
 * @author Johnathan Pulos
 **/
class Extension extends \Bolt\BaseExtension
{
    /**
     * Array of extension pathes
     *
     * @var array
     * @access private
     **/
    private $extensionPaths = array(
        'org_selector_action'   =>  '/gamify_classes/organization.json'
    );
    /**
     * The table prefix
     *
     * @var string
     * @access private
     **/
    private $tablePrefix;
    /**
     * Setup information about the extension
     *
     * @return array
     * @access public
     * @author Johnathan Pulos
     **/
    function info() {

        $data = array(
            'name' =>"Gamify Classes",
            'description' => "A custom extension to gamify the Faith and Tech classes.",
            'author' => "Missional Digerati",
            'link' => "http://www.missionaldigerati.org",
            'version' => "1.1",
            'required_bolt_version' => "1.0",
            'highest_bolt_version' => "1.0",
            'type' => "Custom Extension",
            'first_releasedate' => "2014-04-16",
            'latest_releasedate' => "2014-04-16",
        );
        return $data;
    }
    /**
     * initialize the extension
     *
     * @return void
     * @access public
     * @author Johnathan Pulos
     **/
    function initialize() {
        $this->config = $this->getConfig();
        $this->tablePrefix = $this->app['config']->get('general/database/prefix', "bolt_");
        $this->addTwigFunction('organization_select_form', 'createOrgSelectForm');
        $this->app->match($this->extensionPaths['org_selector_action'], array($this, 'processOrgSelectorForm'));
    }
    /**
     * Gets the form to select an organization that will receive the points
     *
     * @return \Twig_Markup
     * @access public
     * @author Johnathan Pulos
     **/
    public function createOrgSelectForm()
    {
        $html = '';
        $orgs = $this->getOrgArrayForSelect();
        /**
         * Create the form to return
         */
        $form = $this->app['form.factory']->createBuilder('form', array())
            ->add(
                'organization',
                'choice',
                array(
                    'label'         =>  'Organizaton',
                    'choices'       =>  $orgs,
                    'empty_value'   => 'Choose an Organization'
                )
            )
            ->getForm();

        /**
         * Render the form
         */
        $this->app['twig.loader.filesystem']->addPath(__DIR__);
        $html = $this->app['twig']->render(
            'assets/org_selector_form.twig',
            array(
                'form'      =>  $form->createView(),
                'action'    =>  $this->extensionPaths['org_selector_action']
            )
        );
        return new \Twig_Markup($html, 'UTF-8');
    }
    /**
     * process the organization selector form, and return the organization details.
     *
     * @param Symfony\Component\HttpFoundation\Request $request the request Object
     * @return string A JSON object of the org info
     * @access public
     * @author Johnathan Pulos
     **/
    public function processOrgSelectorForm(Request $request)
    {
        $response = array();
        $data = $request->request->all();
        if ($request->getMethod() != 'POST') {
            $response = array(
                'success'       =>  false,
                'error'         =>  true,
                'organization'  =>  array(),
                'message'       =>  __('The request must be sent as a POST!')
            );
        } else {
            if ((isset($data['form']['organization'])) && ($data['form']['organization'] != '')) {
                $id = (int) $data['form']['organization'];
                $orgData = $this->app['storage']->getContent('organizations', array('id' => $id, 'returnsingle' => true));
                $table = $this->tablePrefix . "organizations";
                $sql = "Select * FROM $table WHERE id = ?";
                $orgData = $this->app['db']->fetchAll($sql, array($id));
                if (!empty($orgData)) {
                    $org = array(
                        'id'                    =>  $orgData[0]['id'],
                        'address'               =>  strip_tags($orgData[0]['address']),
                        'game_points_earned'    =>  $orgData[0]['game_points_earned'],
                        'gamify_token'          =>  $orgData[0]['gamify_token']
                    );
                    $response = array(
                        'success'       =>  true,
                        'error'         =>  false,
                        'organization'  =>  $org,
                        'message'       =>  ''
                    );
                } else {
                    $response = array(
                        'success'       =>  false,
                        'error'         =>  true,
                        'organization'  =>  array(),
                        'message'       =>  __('The organization does not exist!')
                    );                     
                }
            } else {
                $response = array(
                    'success'       =>  false,
                    'error'         =>  true,
                    'organization'  =>  array(),
                    'message'       =>  __('The request requires an ID to be set!')
                );      
            }
        }
        return $this->app->json($response);
    }
    /**
     * Get an array of organizations ideal for a selector.  Key is the id, and value is the name - address
     *
     * @return array
     * @access private
     * @author Johnathan Pulos
     **/
    private function getOrgArrayForSelect()
    {
        $orgArray = array();
        $orgs = $this->app['storage']->getContent('organizations', array('order' => 'name ASC'));
        foreach ($orgs as $org) {
            $orgArray[$org['id']] = $org['name'] . " - " . strip_tags($org['address']);
        }
        return $orgArray;
    }
}
