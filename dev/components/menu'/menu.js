'use strict';

var APP = window.APP = window.APP || {};

APP.menu = (function () {

    var init = function (element) {
    	$(".menu li:first-of-type").click(function(){
    		$(".menu ul li:nth-of-type(n+2)").slideToggle();
    	})
    };
    return {
        init: init
    };

}());

APP.menu.init();