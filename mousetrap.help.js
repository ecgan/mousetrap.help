/*
 * Mousetrap.help is an extension to show Mousetrap keyboard shortcuts in a Gmail style lightbox popup.
 */

Mousetrap = (function (Mousetrap) {
    var originalBind = Mousetrap.bind,
        helpInfo = {},

        /**
         * direct map of string combinations to callbacks used for trigger()
         *
         * @type {Object}
         */
        _direct_map = {},

        /*
         * CSS style for the help overlay. Look at the unminified_help.css file
         * for the unminified version.
         *
         * @type {string}
        */
        _CSS_HELP_STYLE = ".mousetrap_lightbox{font-family:arial,sans-serif;position:fixed;top:10%;left:15%;width:65%;height:65%;border-radius:10px;background-color:#222;opacity:0.85;z-index:1002;overflow:auto;color:#FFF;display:table;padding:25px;}#mousetrap_title{margin-left:20px;padding-bottom:10px;font-size:1.17em;font-weight:700;}#mousetrap_table{margin:7px;}#mousetrap_table > div{display:table-row;}#mousetrap_table > div > div{display:table-cell;padding:2px 4px;}#mousetrap_table > div > div:nth-child(1){width:50%;}#mousetrap_table > div > div:nth-child(3){width:47%;}.mousetrap_key{font-family:'courier new', monospace;font-size:120%;color:#FF0;}.mousetrap_sequence{text-align:right;}",

         /**
         * The shortcut help div that should be added and removed as we want
         * to show or hide the help.
         *
         * @type {Object}
         */
        _help_div,

         /**
         * Whether the help CSS was added to the DOM already. This should only happen once and only
         * if the help is ever actualy used so to not to pollute the DOM.
         *
         * @type {Boolean}
         */
        _help_css_was_added = false;

    var loadPopup = function () {

        //Only add CSS once:
        if (!_help_css_was_added) {
            //Add the style element to just after the head so that other style declaration
            //or linked CSS can override it:
            var styleElement = document.createElement("style");
            styleElement.innerHTML = _CSS_HELP_STYLE;
            document.head.insertBefore(styleElement, document.head.firstChild);
            _help_css_was_added = true;
        }

        //Start the lighbox HTML showing title and starting the div table to make it look pretty:
        mappingHtml = "<div class='mousetrap_lightbox'><span id='mousetrap_title' onclick='javascript:this.close();'>Keyboard Shortcuts</span>";
        mappingHtml += "<div id='mousetrap_table'>";

        //Add all the mappings with their respective class:
        for (var key in helpInfo) {
            shortcut = key;

            //Change spaces to " then " like gmail does for sequences:
            shortcut = shortcut.replace(/ /g, "</span> then <span class='mousetrap_key'>");
            shortcut = shortcut.replace(/\+/g, "</span> + <span class='mousetrap_key'>");
            shortcut = shortcut.replace(/,/g, "</span> , <span class='mousetrap_key'>");

            var seqHTML = "<div><div class='mousetrap_sequence'><span class='mousetrap_key'>";
            seqHTML += shortcut;
            seqHTML += "</span></div><div>:</div>";

            var helpText = helpInfo[key];

            mappingHtml += seqHTML + "<div class='mousetrap_explanation'>" + helpText + "</div></div>";
        }

        mappingHtml += '</div>';
        _help_div = document.createElement("div");
        _help_div.innerHTML = mappingHtml;
        document.getElementsByTagName('body')[0].appendChild(_help_div);

    };

    Mousetrap.bind = function (keys, callback, action, helpText) {
        // if the third variable is not one of the allowed action values use that for help text
        if (action !== 'keyup' && action !== 'keydown' && action !== 'keypress') {
            helpText = action;
            action = undefined;
        }

        if (helpText) {
            helpInfo[keys] = helpText;
        }

        return originalBind(keys, callback, action);
    };

    Mousetrap.help = function () {
        // if the help div already exists, then don't do anything.
        if (_help_div) {
            return;
        }
        loadPopup();
    };

    Mousetrap.unhelp = function () {
        //If the _help_div doesn't exist we're not showing help and there is nothing
        //to hide:
        if (!_help_div) {
            return;
        }
        document.getElementsByTagName('body')[0].removeChild(_help_div);
        _help_div = null;
    };

    Mousetrap.toggleHelp = function () {
        //If _help_div is not null we're already showing help, so hide it instead:
        if (_help_div) {
            Mousetrap.unhelp();
            return;
        }
        Mousetrap.help();
    };

    Mousetrap.bind('?', Mousetrap.toggleHelp);
    Mousetrap.bind('esc', Mousetrap.unhelp);

    return Mousetrap;
})(Mousetrap);
