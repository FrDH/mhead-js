import options from './_options';
import version from '../_version';

/**
 * Class for a sticky navigational header.
 */
export default class Mhead {
    /**	Plugin version. */
    static version: string = version;

    /**	Default options for headers. */
    static options: mhOptions = options;

    /** State for a "pinned" header. */
    static PINNED: string = 'pinned';

    /** State for a "unpinned" header. */
    static UNPINNED: string = 'unpinned';

    /** The HTML element for the header. */
    header: HTMLElement;

    /**	Options for the header. */
    opts: mhOptions = {};

    /** State of the header (pinned or unpinned). */
    state: string;

    /**
     * Create a sticky header.
     * @param {HTMLElement|string} 	header						(Selector for) the header node.
     * @param {object} 				[options=Mhead.options]		Options for the header.
     */
    constructor(header: HTMLElement | string, options: mhOptions = {}) {
        //	Get header node from string or element.
        this.header =
            typeof header == 'string' ? document.querySelector(header) : header;

        // Stop if there is no header element found.
        if (!header) {
            return;
        }

        //	Extend options from defaults.
        const keys = Object.keys(Mhead.options);
        for (let o = 0; o < keys.length; o++) {
            this.opts[keys[o]] = options[keys[o]] || Mhead.options[keys[o]];
        }

        this.initScroll();
    }

    /**
     * Initiate the scroll functionality.
     */
    initScroll() {
        if (this.opts.unpin === false) {
            return;
        }

        this.header.classList.add('mh-sticky');

        /** Minimum scroll position to unpin / hide the header. */
        var _min = this.header.offsetHeight * 2;
        this.opts.unpin = Math.max(_min, this.opts.unpin || 0);
        this.opts.pin = Math.max(_min, this.opts.pin || 0);

        this.state = null;

        /** Previous scroll position. */
        var lastYpos = 0;

        const onscroll = (evnt = {}) => {
            /** Current scroll position. */
            var pos =
                document.documentElement.scrollTop || document.body.scrollTop;

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
                    if (pos < this.opts.pin || dif > this.opts.tolerance) {
                        this.pin();
                    }
                }
            }

            //	If pinned / not scrolled out the viewport.
            else if (this.state == Mhead.PINNED) {
                //	If scrolling down.
                if (dir == 'down') {
                    //	If scrolling fast enough and past minimum.
                    if (pos > this.opts.unpin && dif > this.opts.tolerance) {
                        this.unpin();
                    }
                }
            } else {
                this.pin();
            }
        };

        window.addEventListener('scroll', onscroll, {
            passive: true,
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
    }

    /**
     * Release the header from the top of the viewport.
     */
    unpin() {
        this.header.classList.remove('mh-pinned');
        this.header.classList.add('mh-unpinned');
        this.state = Mhead.UNPINNED;
    }
}
