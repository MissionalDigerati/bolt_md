PrivateContent Extension
========================

This bolt extension gives you the ability to password protect a view from unautorized access.  This is a very simple authorization, and is only designed to keep people from seeing one page content.

Usage
-----

First, you will need to add a field to your content type that stores the access key.  Here is an example.

        access_key:
            label: 'Access Key (If this is a private class, add a unique access key)'
            type: text
            class: wide

Now on the page you want to lock down, use the following Twig template tag.

{{ private_content_form(CONTENTTYPE, SLUG, THE FIELD NAME FOR YOUR ACCESS KEY) }}

You will most likely want to put this form in a dialog box that blacks out the page.  Then write some JQuery to submit the form.  The response for submitting the form comes back in JSON.  It will look like this:

{"authorized":true}

True, means the authorization passed, and you can close the dialog box.  We reserve the url `/pc_authorize.json` for the response of the form.

License
-------

This script is created by Missional Digerati and is under the [GNU General Public License v3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).