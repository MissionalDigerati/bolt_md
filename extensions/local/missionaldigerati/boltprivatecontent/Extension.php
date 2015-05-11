<?php
/**
 * This file is part of BoltPrivateContent Bolt CMS Extension.
 * 
 * BoltPrivateContent Bolt CMS Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * BoltPrivateContent Bolt CMS Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see 
 * <http://www.gnu.org/licenses/>.
 *
 * @author Johnathan Pulos <johnathan@missionaldigerati.org>
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * 
 */

namespace Bolt\Extension\MissionalDigerati\BoltPrivateContent;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Related Sort is an Extension for the Bolt CMS (@link http://bolt.cm)
 *
 * @package default
 * @author Johnathan Pulos
 **/
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
     * Get the name of the extension/
     *
     * @return string
     * @author Johnathan Pulos
     **/
    public function getName()
    {
        return "Bolt Private Content";
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
