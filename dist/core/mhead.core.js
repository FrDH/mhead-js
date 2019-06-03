import options from './_options';
import version from '../_version';
/**
 * Class for a sticky navigational header.
 */
export default class Mhead {
    /**
     * Create a sticky header.
     * @param {HTMLElement|string} 	header						The header node.
     * @param {object} 				[options=Mhead.options]		Options for the header.
     */
    constructor(header, options = Mhead.options) {
        //	Get header node from string or element.
        this.header =
            typeof header == 'string' ? document.querySelector(header) : header;
        // Stop if there is no header element found.
        if (!header) {
            return;
        }
        //	Extend options from defaults.
        this.opts = Object.assign(options, Mhead.options);
        this.initHooks();
        this.initScroll();
    }
    /**
     * Initiate the scroll functionality.
     */
    initScroll() {
        if (!this.opts.scroll || this.opts.scroll.unpin === false) {
            return;
        }
        this.header.classList.add('mh-sticky');
        /** Minimum scroll position to unpin / hide the header. */
        var _min = this.header.offsetHeight * 2;
        this.opts.scroll.unpin = Math.max(_min, this.opts.scroll.unpin || 0);
        this.opts.scroll.pin = Math.max(_min, this.opts.scroll.pin || 0);
        this.state = null;
        /** Previous scroll position. */
        var lastYpos = 0;
        const onscroll = (evnt = {}) => {
            /** Current scroll position. */
            var pos = document.documentElement.scrollTop || document.body.scrollTop;
            /** Difference between current scroll position and previous scroll position. */
            var dif = lastYpos - pos;
            /** Direction of the scroll. */
            var dir = dif < 0 ? 'down' : 'up';
            dif = Math.abs(dif);
            lastYpos = pos;
            //	If not pinned / scrolled out the viewport.
            if (this.state == Mhead.UNPINNED) {
                //	If scrolling up
                if (dir == 'up') {
                    //	If scrolling fast enough or past minimum
                    if (pos < this.opts.scroll.pin ||
                        dif > this.opts.scroll.tolerance) {
                        this.pin();
                    }
                }
            }
            //	If pinned / not scrolled out the viewport.
            else if (this.state == Mhead.PINNED) {
                //	If scrolling down.
                if (dir == 'down') {
                    //	If scrolling fast enough and past minimum.
                    if (pos > this.opts.scroll.unpin &&
                        dif > this.opts.scroll.tolerance) {
                        this.unpin();
                    }
                }
            }
            else {
                this.pin();
            }
        };
        window.addEventListener('scroll', onscroll, {
            passive: true
        });
        onscroll();
    }
    /**
     * Pin the header to the top of the viewport.
     */
    pin() {
        this.header.classList.add('mh-pinned');
        this.header.classList.remove('mh-unpinned');
        this.state = Mhead.PINNED;
        this.trigger('pinned');
    }
    /**
     * Release the header from the top of the viewport.
     */
    unpin() {
        this.header.classList.remove('mh-pinned');
        this.header.classList.add('mh-unpinned');
        this.state = Mhead.UNPINNED;
        this.trigger('unpinned');
    }
    /**
     * Bind the hooks specified in the options (publisher).
     */
    initHooks() {
        this.hooks = {};
        for (let hook in this.opts.hooks) {
            this.bind(hook, this.opts.hooks[hook]);
        }
    }
    /**
     * Bind functions to a hook (subscriber).
     * @param {string} 		hook The hook.
     * @param {function} 	func The function.
     */
    bind(hook, func) {
        //	Create an array for the hook if it does not yet excist.
        this.hooks[hook] = this.hooks[hook] || [];
        //	Push the function to the array.
        this.hooks[hook].push(func);
    }
    /**
     * Invoke the functions bound to a hook (publisher).
     * @param {string} 	hook  	The hook.
     * @param {array}	[args] 	Arguments for the function.
     */
    trigger(hook, args) {
        if (this.hooks[hook]) {
            for (var h = 0, l = this.hooks[hook].length; h < l; h++) {
                this.hooks[hook][h].apply(this, args);
            }
        }
    }
}
/**	Plugin version. */
Mhead.version = version;
/**	Default options for headers. */
Mhead.options = options;
/** State for a "pinned" header. */
Mhead.PINNED = 'pinned';
/** State for a "unpinned" header. */
Mhead.UNPINNED = 'unpinned';
