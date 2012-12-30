# Mousetrap Help

Mousetrap Help is a mousetrap.js extension to display keyboard shortcuts in a simple lightbox popup.

## Getting started

1.  Include mousetrap and mousetrap.help on your page before the closing ``</body>`` tag

    ```html
    <script src="/path/to/mousetrap.min.js"></script>
	<script src="/path/to/mousetrap.help.min.js"></script>
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

## What is Mousetrap?

Visit http://craig.is/killing/mice for its awesomeness!

## Credit

@ccampbell for the awesome mousetrap. 
@sveder for the lightbox idea. All major work comes from him.
@ecgan for making this into a mousetrap extension with some improvements and bugfixes. 
