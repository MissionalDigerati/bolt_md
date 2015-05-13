Bolt Private Content
====================

"Bolt Private Content" is a small [Twig](http://twig.sensiolabs.org) extension built for the [Bolt CMS](http://bolt.cm) to lock content down, and require a password to view it.

Usage
-----

First, you will need to add a field to your content type that stores the access key.  Here is an example.
`
        access_key:
            label: 'Access Key (If this is a private class, add a unique access key)'
            type: text
            class: wide
`

Now on the page you want to lock down, use the following Twig template tag.

{{ private_content_form(CONTENTTYPE, SLUG, THE FIELD NAME FOR YOUR ACCESS KEY) }}

You will most likely want to put this form in a dialog box that blacks out the page.  Then write some JQuery to submit the form.  The response for submitting the form comes back in JSON.  It will look like this:

{"authorized":true}

True, means the authorization passed, and you can close the dialog box.  We reserve the url `/pc_authorize.json` for the response of the form.


Development Notes
-----------------

This repository is following the branching technique described in [this blog post](http://nvie.com/posts/a-successful-git-branching-model/), and the semantic version set out on the [Semantic Versioning Website](http://semver.org/).  We also follow [FIG Standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) for writing code.

License
-------
This script is created by Missional Digerati and is under the [GNU General Public License v3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).