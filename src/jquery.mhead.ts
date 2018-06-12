/*
 * jQuery mhead v1.0.2
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl/mhead-plugin
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */

(function( $ ) {

	const _PLUGIN_  = 'mhead';
	const _VERSION_	= '1.0.2';


	//	Newer version of the plugin already excists
	if ( $[ _PLUGIN_ ] && $[ _PLUGIN_ ].version > _VERSION_ )
	{
		return;
	}


	/*
		Class
	*/
	$[ _PLUGIN_ ] = function( $head, opts, conf )
	{
		this.$head  = $head;
		this.opts 	= opts;
		this.conf 	= conf;

		this._initButtons();
		this._initList();
		this._initHamburger();
		this._initScroll();

		return this;
	};

	$[ _PLUGIN_ ].version = _VERSION_;

	$[ _PLUGIN_ ].defaults = {
		scroll 		: {
			hide 		: 0,
			show		: 0,
			tolerance	: 4
		},
		hamburger 	: {
			menu 		: null,
			animation	: 'collapse'
		}
	};

	$[ _PLUGIN_ ].configuration = {
		initButtons 	: true,
		initList		: true,
		initHamburger	: true,
		initScroll		: true
	};

	$[ _PLUGIN_ ].prototype = {

		_initButtons: function()
		{
			if ( !this.conf.initButtons )
			{
				return this;
			}

			var align = false,
				sides = { left: 0, right: 0 },
				count = 0,
				largs = 0;

			//	Count the buttons left and right
			//		and detect aligned title or logo
			for ( var s in sides )
			{
				align = align || this.$head.hasClass( _c.align + '-' + s );

				if ( count = this.$head.children( '.' + _c.btns + '-' + s ).children().length )
				{
					largs = Math.max( count, largs );
					sides[ s ] = count;
				}
			}

			//	If text or logo is centered (align=false),
			//		set the padding left and right to the largest number
			if ( !align )
			{
				for ( var s in sides )
				{
					sides[ s ] = largs;
				}
			}

			//	Set the padding per side
			for ( var s in sides )
			{
				if ( sides[ s ] )
				{
					var cls = _c.btns + '-' + s;
					if ( sides[ s ] > 1 )
					{
						cls += '-' + sides[ s ];
					}
					this.$head.addClass( cls );
				}
			}

			return this;
		},

		_initList: function()
		{
			if ( !this.conf.initList )
			{
				return this;
			}
			this.$head
				.find( '.' + _c.list )
				.each(
					function()
					{
						$(this).children().appendTo( this );
					}
				);

		},

		_initScroll: function()
		{
			if ( !this.conf.initScroll )
			{
				return this;
			}
			if ( !this.opts.scroll || this.opts.scroll.hide === false )
			{
				return this;
			}

			if ( !this.$head.hasClass( _c.sticky ) )
			{
				this.$head.addClass( _c.sticky );
			}

			var that = this;

			var lastYpos = 0,
				scrolledout = null;

			//	Find minimum
			var _min = this.$head.offset().top + this.$head.outerHeight();
			this.opts.scroll.hide = Math.max( _min, this.opts.scroll.hide || 0 );
			this.opts.scroll.show = Math.max( _min, this.opts.scroll.show || 0 );

			glbl.$wndw
				.on( _e.scroll,
					function()
					{
						var pos = glbl.$wndw.scrollTop(),
							dif = lastYpos - pos,
							dir = dif < 0 ? 'down' : 'up';

						dif = Math.abs( dif );
						lastYpos = pos;

						if ( scrolledout === null )
						{
							scrolledout = pos > that.opts.scroll.show;
						}

						//	If scrolledout
						if ( scrolledout )
						{
							//	If scrolling up
							if ( dir == 'up' )
							{
								//	If scrolling fast enough or past minimum
								if ( pos < that.opts.scroll.show ||
									dif > that.opts.scroll.tolerance )
								{
									scrolledout = false;
									that.$head.removeClass( _c.scrolledout );
								}
							}
						}

						//	If not scrolled out
						else
						{
							//	If scrolling down
							if ( dir == 'down' )
							{
								//	If scrolling fast enough and past minimum
								if ( pos > that.opts.scroll.hide &&
									dif > that.opts.scroll.tolerance )
								{
									scrolledout = true;
									that.$head.addClass( _c.scrolledout );
								}
							}
						}
					}
				)
				.trigger( _e.scroll );

			return this;
		},

		_initHamburger: function()
		{
			if ( !this.conf.initHamburger )
			{
				return this;
			}

			var $ham = this.$head.find( '.' + _c.hamburger );
			if ( !$ham.length )
			{
				return;
			}

			var that = this;

			$ham.each(
				function()
				{
					var $h = $(this),
						$b = $('<button class="hamburger"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>'),
						hr = $h.attr( 'href' );

					//	Add markup
					$h.replaceWith( $b );
					$b.addClass( 'hamburger--' + that.opts.hamburger.animation );

					//	Find the menu
					var $menu = $(),
						_arr  = [ hr, that.opts.hamburger.menu, '.mm-menu' ];
					
					for ( var a = 0; a < _arr.length; a++ )
					{
						if ( _arr[ a ] )
						{
							$menu = $( _arr[ a ] );
							if ( $menu.length && $menu.is( '.mm-menu' ) )
							{
								$menu = $menu.first();
								break;
							}
						}
					}

					//	Open menu, animate hamburger
					var API = $menu.data( "mmenu" );

					$b.on( _e.click, function() {
					   API.open();
					});

					API.bind( "open:finish", function() {
					   setTimeout(function() {
					      $b.addClass( "is-active" );
					   }, 100);
					});
					API.bind( "close:finish", function() {
					   setTimeout(function() {
					      $b.removeClass( "is-active" );
					   }, 100);
					});
				}
			);

			return this;
		}
	};


	/*
		jQuery plugin
	*/
	$.fn[ _PLUGIN_ ] = function( opts, conf )
	{
		//	First time plugin is fired
		initPlugin();

		//	Extend options
		opts = $.extend( true, {}, $[ _PLUGIN_ ].defaults, opts );
		conf = $.extend( true, {}, $[ _PLUGIN_ ].configuration, conf );

		return this.each(
			function()
			{
				var $head = $(this);
				if ( $head.data( _PLUGIN_ ) )
				{
					return;
				}

				var _head = new $[ _PLUGIN_ ]( $head, opts, conf );
				$head.data( _PLUGIN_, _head );
			}
		);
	};


	/*
		SUPPORT
	*/
	$[ _PLUGIN_ ].support = {

		touch: 'ontouchstart' in window || navigator.msMaxTouchPoints || false
	};


	//	Global variables
	var _c, _d, _e, glbl;

	function initPlugin()
	{
		if ( $[ _PLUGIN_ ].glbl )
		{
			return;
		}

		glbl = {
			$wndw : $(window),
			$docu : $(document),
			$html : $('html'),
			$body : $('body')
		};


		//	Classnames, Datanames, Eventnames
		_c = {};
		_d = {};
		_e = {};

		$.each( [ _c, _d, _e ],
			function( i, o )
			{
				o.add = function( a )
				{
					a = a.split( ' ' );
					for ( var b = 0, l = a.length; b < l; b++ )
					{
						o[ a[ b ] ] = o.mh( a[ b ] );
					}
				};
			}
		);

		//	Classnames
		_c.mh = function( c ) { return 'mh-' + c; };
		_c.add( 'head sticky scrolledout align btns list hamburger' );
		_c.umh = function( c )
		{
			if ( c.slice( 0, 3 ) == 'mh-' )
			{
				c = c.slice( 3 );
			}
			return c;
		};

		//	Datanames
		_d.mh = function( d ) { return 'mh-' + d; };

		//	Eventnames
		_e.mh = function( e ) { return e + '.mh'; };
		_e.add( 'scroll click' );


		$[ _PLUGIN_ ]._c = _c;
		$[ _PLUGIN_ ]._d = _d;
		$[ _PLUGIN_ ]._e = _e;

		$[ _PLUGIN_ ].glbl = glbl;
	}


})( jQuery );
