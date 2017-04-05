'use strict';

require("Styles/main.scss");

var Pjax = require("pjax");
var $ = require("jquery");

new Pjax({ selectors: ["title", "main", ".menu__list"] });

$(function() {
  var menuToggleOnClick = function(selector, show) {
    $(selector).click(function() {
      $(".menu").toggle(show);
      $("body").css("overflow", show ? "hidden" : "inherit");
    });
  };

  menuToggleOnClick(".top-row__hamburger", true);
  menuToggleOnClick(".menu__close-button, .menu__item a", false);

  $(document).on('pjax:complete', function() {
    menuToggleOnClick(".menu__item a", false);
  });
});
