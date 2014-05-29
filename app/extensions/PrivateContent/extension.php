<?php
// PrivateContent Extension for Bolt
// Minimum version: 0.7

namespace PrivateContent;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Extension extends \Bolt\BaseExtension
{

    /**
     * The url for authorizing access
     *
     * @var string
     * @access private
     **/
    private $authorizeURL = '/private-content/pc_authorize.json';
    /**
     * Describe the extension
     *
     * @return array the information about this extension
     * @access public
     * @author Johnathan Pulos
     **/
    public function info() {

        $data = array(
            'name' =>"Private Content!",
            'description' => "A small extension for locking out content.  It looks in the database for the passkey.",
            'author' => "Missional Digerati",
            'link' => "http://missionaldigerati.org",
            'version' => "1.1",
            'required_bolt_version' => "1.0",
            'highest_bolt_version' => "1.0",
            'type' => "Twig function",
            'first_releasedate' => "2014-04-24",
            'latest_releasedate' => "2014-04-24",
        );
        return $data;
    }
    /**
     * Initialize the class
     *
     * @return void
     * @access public
     * @author Johnathan Pulos
     **/
    public function initialize() {
        $this->app->post($this->authorizeURL, array($this, 'authorizeAccess'));
        $this->addTwigFunction('private_content_form', 'createAuthorizeForm');
    }
    /**
     * Creates the form for authorizing access to the area
     *
     * @param string $contenttype the content type of the area being protected
     * @param string $slug the content type slug
     * @param string $field the table column storing the access key to check
     * @return \Twig_Markup
     * @access public
     * @author Johnathan Pulos
     **/
    public function createAuthorizeForm($contenttype, $slug, $field)
    {
        /**
         * Set the data in the session for authorizing
         */
        $this->app['session']->set('privateContent.contenttype', $contenttype);
        $this->app['session']->set('privateContent.slug', $slug);
        $this->app['session']->set('privateContent.field', $field);
        /**
         * Create the form to return
         */
        $form = $this->app['form.factory']->createBuilder('form', array())
            ->add('access_key', 'text', array('label'   =>  'Access Key'))
            ->getForm();

        /**
         * Render the form
         */
        $this->app['twig.loader.filesystem']->addPath(__DIR__);
        $html = $this->app['twig']->render(
            'assets/access_form.twig',
            array(
                'form'      =>  $form->createView(),
                'action'    =>  $this->authorizeURL
            )
        );

        return new \Twig_Markup($html, 'UTF-8');
    }
    /**
     * Checks if the user is authorized to access the content
     *
     * @param Symfony\Component\HttpFoundation\Request $request the request Object
     * @return string a JSON response with Boolean value for key 'authorized' is allowed to access?
     * @access public
     * @author Johnathan Pulos
     **/
    public function authorizeAccess(Request $request)
    {
        $authorized = false;
        $data = array();
        $contenttype = $this->app['session']->get('privateContent.contenttype');
        $slug = $this->app['session']->get('privateContent.slug');
        $field = $this->app['session']->get('privateContent.field');
        if ($request->getMethod() == 'POST') {
            $data = $request->request->all();
            if ((isset($data['form']['access_key'])) && ($data['form']['access_key'] != '')) {
                $providedAccessKey = $data['form']['access_key'];
                $contenttypeData = $this->app['storage']->getContent("$contenttype/$slug", array('returnsingle' => true));
                $actualAccessKey = $contenttypeData->access_key();
                if ($actualAccessKey == $providedAccessKey) {
                    $authorized = true;
                }
            }
        }
        $response = $this->app->json(array('authorized' =>  $authorized));
        return $response;
    }
}
