;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.jquery_mhead_js = factory(root.jQuery);
  }
}(this, function(jQuery) {
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
!function(t){function i(){t[n].glbl||(a={$wndw:t(window),$docu:t(document),$html:t("html"),$body:t("body")},o={},r={},h={},t.each([o,r,h],function(t,i){i.add=function(t){t=t.split(" ");for(var n=0,s=t.length;n<s;n++)i[t[n]]=i.mh(t[n])}}),o.mh=function(t){return"mh-"+t},o.add("head sticky scrolledout align btns list hamburger"),o.umh=function(t){return"mh-"==t.slice(0,3)&&(t=t.slice(3)),t},r.mh=function(t){return"mh-"+t},h.mh=function(t){return t+".mh"},h.add("scroll click"),t[n]._c=o,t[n]._d=r,t[n]._e=h,t[n].glbl=a)}var n="mhead",s="1.0.2";if(!(t[n]&&t[n].version>s)){t[n]=function(t,i,n){return this.$head=t,this.opts=i,this.conf=n,this._initButtons(),this._initList(),this._initHamburger(),this._initScroll(),this},t[n].version=s,t[n].defaults={scroll:{hide:0,show:0,tolerance:4},hamburger:{menu:null,animation:"collapse"}},t[n].configuration={initButtons:!0,initList:!0,initHamburger:!0,initScroll:!0},t[n].prototype={_initButtons:function(){if(!this.conf.initButtons)return this;var t=!1,i={left:0,right:0},n=0,s=0;for(var r in i)t=t||this.$head.hasClass(o.align+"-"+r),(n=this.$head.children("."+o.btns+"-"+r).children().length)&&(s=Math.max(n,s),i[r]=n);if(!t)for(var r in i)i[r]=s;for(var r in i)if(i[r]){var h=o.btns+"-"+r;i[r]>1&&(h+="-"+i[r]),this.$head.addClass(h)}return this},_initList:function(){return this.conf.initList?void this.$head.find("."+o.list).each(function(){t(this).children().appendTo(this)}):this},_initScroll:function(){if(!this.conf.initScroll)return this;if(!this.opts.scroll||this.opts.scroll.hide===!1)return this;this.$head.hasClass(o.sticky)||this.$head.addClass(o.sticky);var t=this,i=0,n=null,s=this.$head.offset().top+this.$head.outerHeight();return this.opts.scroll.hide=Math.max(s,this.opts.scroll.hide||0),this.opts.scroll.show=Math.max(s,this.opts.scroll.show||0),a.$wndw.on(h.scroll,function(){var s=a.$wndw.scrollTop(),r=i-s,h=r<0?"down":"up";r=Math.abs(r),i=s,null===n&&(n=s>t.opts.scroll.show),n?"up"==h&&(s<t.opts.scroll.show||r>t.opts.scroll.tolerance)&&(n=!1,t.$head.removeClass(o.scrolledout)):"down"==h&&s>t.opts.scroll.hide&&r>t.opts.scroll.tolerance&&(n=!0,t.$head.addClass(o.scrolledout))}).trigger(h.scroll),this},_initHamburger:function(){if(!this.conf.initHamburger)return this;var i=this.$head.find("."+o.hamburger);if(i.length){var n=this;return i.each(function(){var i=t(this),s=t('<button class="hamburger"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>'),o=i.attr("href");i.replaceWith(s),s.addClass("hamburger--"+n.opts.hamburger.animation);for(var r=t(),a=[o,n.opts.hamburger.menu,".mm-menu"],e=0;e<a.length;e++)if(a[e]&&(r=t(a[e]),r.length&&r.is(".mm-menu"))){r=r.first();break}var l=r.data("mmenu");s.on(h.click,function(){l.open()}),l.bind("open:finish",function(){setTimeout(function(){s.addClass("is-active")},100)}),l.bind("close:finish",function(){setTimeout(function(){s.removeClass("is-active")},100)})}),this}}},t.fn[n]=function(s,o){return i(),s=t.extend(!0,{},t[n].defaults,s),o=t.extend(!0,{},t[n].configuration,o),this.each(function(){var i=t(this);if(!i.data(n)){var r=new t[n](i,s,o);i.data(n,r)}})},t[n].support={touch:"ontouchstart"in window||navigator.msMaxTouchPoints||!1};var o,r,h,a}}(jQuery);
return true;
}));
