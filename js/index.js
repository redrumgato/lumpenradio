'use strict';

require("Styles/main.scss");

var Pjax = require("pjax");
var $ = require("jquery");
var Howler = require("howler");

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

  var $play = $("#play-button");
  var $pause = $("#pause-button");

  Howler.Howler.unload();

  var stream = new Howler.Howl({
      src: "http://stream.lumpen.fm:7416/;stream/1",
      format: "mp3",
      html5: true
  });

  $(".player__play-pause").click(function(event) {
    if(stream.playing()) {
      $pause.hide();
      $play.show();
      stream.pause();
    } else {
      $play.hide();
      $pause.show();
      stream.play();
    }
  });
});
