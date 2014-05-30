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
     * @author Johnathan Pulos
     **/
    function initialize() {
        $this->config = $this->getConfig();
    }
}
