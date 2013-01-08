# Important Note

I started this to help [Sveder](https://github.com/sveder) port his work to become a Mousetrap Help extension. Please visit [Sveder's Mousetrap Help repository](https://github.com/Sveder/mousetrap.help) for the official updated version.

-----

# Mousetrap Help

Mousetrap Help is a mousetrap.js extension to display keyboard shortcuts in a simple lightbox popup.

## Getting started

1.  Include mousetrap and mousetrap.help on your page before the closing ``</body>`` tag

    ```html
    <script src="/path/to/mousetrap.min.js"></script>
	<script src="/path/to/mousetrap.help.js"></script>
    ```

2.  Add some keyboard events to listen for

    ```html
    <script>
        // single keys
        Mousetrap.bind("?", function() { console.log('show shortcuts!'); }, "Show shortcuts!");
        Mousetrap.bind('esc', function() { console.log('escape'); }, 'keyup', "Hide shortcuts.");

        // combinations
        Mousetrap.bind('command+shift+K', function() { console.log('command shift k'); }, "Roundhouse kick!");

        // map multiple combinations to the same callback
        Mousetrap.bind(['command+k', 'ctrl+k'], function() {
            console.log('command k or control k');

            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        }), "Short kick.";

        // gmail style sequences
        Mousetrap.bind('g i', function() { console.log('code here...'); }, "Go to Inbox");
        Mousetrap.bind('* a', function() { console.log('code here...'); }, "Select all");

        // konami code!
        Mousetrap.bind('up up down down left right left right b a enter', function() {
            console.log('konami code');
        }, "Extra lives!");
    </script>
    ```

## API

`Mousetrap.help()` : Show the lightbox popup.

`Mousetrap.unhelp()` : Hide the lightbox popup.

`Mousetrap.togggleHelp()` : Show or hide the lightbox popup.

## What is Mousetrap?

Visit http://craig.is/killing/mice for its awesomeness!

## Credit

[ccampbell](https://github.com/ccampbell) for the awesome mousetrap. 

[sveder](https://github.com/sveder) for the lightbox idea. All major work comes from him.

[ecgan](https://github.com/ecgan) for making this into a mousetrap extension with some improvements and bugfixes. 
