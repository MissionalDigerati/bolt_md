<?php
/**
 * This file is part of BoltRelatedSort Bolt CMS Extension.
 * 
 * BoltRelatedSort Bolt CMS Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * BoltRelatedSort Bolt CMS Extension is distributed in the hope that it will be useful,
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

namespace Bolt\Extension\MissionalDigerati\BoltRelatedSort;

/**
 * Related Sort is an Extension for the Bolt CMS (@link http://bolt.cm)
 *
 * @package default
 * @author Johnathan Pulos
 **/
class Extension extends \Bolt\BaseExtension
{
    /**
     * Get the name of the extension/
     *
     * @return string
     * @author Johnathan Pulos
     **/
    public function getName()
    {
        return "Bolt Related Sort";
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
