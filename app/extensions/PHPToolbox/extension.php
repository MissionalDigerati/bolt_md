<?php
// PHP Toolbox Extension for Bolt
// Minimum version: 0.7

namespace PHPToolbox;
/**
 * A Bolt Extension for handling the basic PHP functionality
 *
 * @package default
 * @author Johnathan Pulos
 **/
class Extension extends \Bolt\BaseExtension
{
    /**
     * Gets the information about this extension
     *
     * @return array The detailed information of this extension
     * @access public
     * @author Johnathan Pulos
     **/
    public function info()
    {
        $data = array(
            'name' =>"PHP Toolbox",
            'description' => "An extension that contains shortcut Twig functions for handling basic PHP functionality.",
            'author' => "Missional Digerati",
            'link' => "http://www.missionaldigerati.org",
            'version' => "1.1",
            'required_bolt_version' => "1.0",
            'highest_bolt_version' => "1.0",
            'type' => "Twig function",
            'first_releasedate' => "2014-04-28",
            'latest_releasedate' => "2014-04-28",
        );

        return $data;
    }
    /**
     * Initialize this extension
     *
     * @return void
     * @access public
     * @author Johnathan Pulos
     **/
    public function initialize()
    {
        $this->addTwigFunction('md5', 'toolboxMD5');
    }
    /**
     * md5 hash a given string.  Simply use this Twig tag: {{ md5('string') }}
     *
     * @return string the md5 hashed version of the given string
     * @access public
     * @author Johnathan Pulos
     **/
    public function toolboxMD5($str = "")
    {
        return md5($str);
    }

}






