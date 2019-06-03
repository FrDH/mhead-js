/** An object with array of functions values. */
interface mhFunctionArrayObject {
    [key: string]: Function[];
}

/** An object with function values. */
interface mhFunctionObject {
    [key: string]: Function;
}

/**	Options for the header. */
interface mhOptions {
    /** Set of hooks for the header. */
    hooks?: mhFunctionObject;

    /** Scroll options for the header. */
    scroll?: mhOptionsScroll;
}

/** Scroll options for the header. */
interface mhOptionsScroll {
    /** Minimum scroll position to pin the header when scrolling up. */
    pin?: number | false;

    /** Minimum scroll position to unpin the header when scrolling down. */
    unpin?: number | false;

    /** Tolerance for scrolling speed. */
    tolerance?: number;
}
