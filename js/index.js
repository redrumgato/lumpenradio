'use strict';

require("Styles/main.scss");

var Pjax = require("pjax");
var $ = require("jquery");
var Howler = require("howler");

new Pjax({
  elements: ["a"],
  selectors: ["title", "main", ".menu__list"]
});

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
  menuToggleOnClick(".menu__close-button, .menu__link", false);

  $(document).on('pjax:complete', function() {
    menuToggleOnClick(".menu__item a", false);
  });

  var $play = $("#play-button");
  var $pause = $("#pause-button");
  var $loading = $(".player__loading-icon");

  Howler.Howler.unload();

  console.log("creating stream");
  var stream = new Howler.Howl({
    src: "http://stream.lumpen.fm:7416/;stream/1",
    format: "mp3",
    html5: true,
    preload: false,
    onload: function() {
      console.log("stream loaded");
      $loading.hide();
      $pause.show();
    },
    onloaderror: function(_, error) {
      console.log("error:");
      console.log(error);
    },
    onplay: function() {
      console.log("playing");
    },
    onpause: function() {
      console.log("pausing");
    }
  });

  $(".player__buttons").click(function() {
    if(stream.playing()) {
      $pause.hide();
      $play.show();
      stream.pause();
    } else {
      $play.hide();
      stream.state() == "loaded" ? $pause.show() : $loading.show();
      stream.play();
    }
  });
});
