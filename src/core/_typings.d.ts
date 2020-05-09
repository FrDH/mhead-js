/**	Options for the header. */
interface mhOptions {
    /** Minimum scroll position to pin the header when scrolling up. */
    pin?: number | false;

    /** Minimum scroll position to unpin the header when scrolling down. */
    unpin?: number | false;

    /** Tolerance for scrolling speed. */
    tolerance?: number;
}
