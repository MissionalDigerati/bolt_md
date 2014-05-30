<?php
// GamifyClasses Extension for Bolt
// Minimum version: 0.7

namespace GamifyClasses;

/**
 * GamifyClasses is an Extension for the Bolt CMS (@link http://bolt.cm)
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
        $this->addTwigFunction('organization_select_form', 'createOrgSelectForm');
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
                'action'    =>  ''
            )
        );
        return new \Twig_Markup($html, 'UTF-8');
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
