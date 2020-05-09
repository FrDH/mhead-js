/*!
 * mhead.js
 * mmenu.frebsite.nl/mhead
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */

import Mhead from '../dist/core/mhead.core';

if (window) {
    //	Global namespace
    window.Mhead = Mhead;

    //	jQuery plugin
    (function ($) {
        if ($) {
            $.fn.mhead = function (options) {
                return this.each((e, element) => {
                    new Mhead(element, options);
                });
            };
        }
    })(window.jQuery || window.Zepto || null);
}
