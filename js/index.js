'use strict';

require("Styles/main.scss");

var Pjax = require("pjax");
var $ = require("jquery");

new Pjax({ selectors: ["title", "main", ".menu__list"] });

$(function() {
  var $body = $("body");
  var bodyScrollPosition;
  var menuToggleOnClick = function(selector, show) {
    $(selector).click(function() {
      show && (bodyScrollPosition = $body.scrollTop());
      $(".menu").css("display", show ? "flex" : "none");
      $body.css("position", show ? "fixed" : "static");
      show || $body.scrollTop(bodyScrollPosition);
    });
  };

  menuToggleOnClick(".top-row__hamburger", true);
  menuToggleOnClick(".menu__close-button, .menu a", false);

  $(document).on('pjax:complete', function() {
    menuToggleOnClick(".menu__item a", false);
  });
});
