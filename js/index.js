'use strict';

import "Styles/main.scss";

import Pjax from "pjax";
import $ from "jquery";
import { Howler, Howl } from "howler";

new Pjax({
  elements: ["a"],
  selectors: ["title", ".content", ".menu__list"]
});

$(() => {
  const $body = $("body");
  let bodyScrollPosition;
  const menuToggleOnClick = (selector, show) => {
    $(selector).click(() => {
      show && (bodyScrollPosition = $body.scrollTop());
      $(".menu").css("display", show ? "flex" : "none");
      $body.css("position", show ? "fixed" : "static");
      show || $body.scrollTop(bodyScrollPosition);
    });
  };

  menuToggleOnClick(".top-row__hamburger", true);
  menuToggleOnClick(".menu__close-button, .menu__link", false);

  $(document).on('pjax:complete', () => {
    menuToggleOnClick(".menu__item a", false);
  });

  const $play = $("#play-button");
  const $pause = $("#pause-button");
  const $loading = $(".player__loading-icon");

  Howler.unload();

  console.log("creating stream");
  const stream = new Howl({
    src: "http://stream.lumpen.fm:7416/;stream/1",
    format: "mp3",
    html5: true,
    preload: false,
    onload () {
      console.log("stream loaded");
      $loading.hide();
      $pause.show();
    },
    onloaderror (_, error) {
      console.log("error:");
      console.log(error);
    },
    onplay () {
      console.log("playing");
    },
    onpause () {
      console.log("pausing");
    }
  });

  $(".player__buttons").click(() => {
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
