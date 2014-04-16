<?php
// Related Sort Extension for Bolt
// Minimum version: 0.7

namespace RelatedSort;

/**
 * Related Sort is an Extension for the Bolt CMS (@link http://bolt.cm)
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
            'name' =>"Related Sort",
            'description' => "A small extension to sort through the given relation.",
            'author' => "Missional Digerati",
            'link' => "http://www.missionaldigerati.org",
            'version' => "1.1",
            'required_bolt_version' => "1.0",
            'highest_bolt_version' => "1.0",
            'type' => "Twig function",
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
        $this->addTwigFunction('related_sort', 'twigRelatedSort');
    }

    /**
     * Takes Bolt's related array ($related) and sorts it using the value of the array key ($sortKey)
     *
     * @param array $related Bolt's related() results
     * @param string $sortKey the key to sort by
     * @param string $order which order to sort (asc, desc) default: asc
     * @return array the sorted objects
     * @access public
     * @author Johnathan Pulos
     **/
    public function twigRelatedSort($related, $sortKey, $order = 'asc')
    {
        $order = strtolower($order);
        uasort(
            $related,
            function($a, $b) use ($sortKey, $order)
            {
                $compare = strnatcmp($a[$sortKey], $b[$sortKey]);
                if ($order == 'desc') {
                    return - $compare;
                } else {
                    return $compare;
                }
            }
        );
        return $related;
    }

}
