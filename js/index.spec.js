'use strict';

import $ from "jquery";
import setup from "./index";

describe("The UI", () => {
  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2017, 4, 4, 8, 21, 5));
    loadFixtures("page.html");
    setup();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe("menu", () => {
    const hamburgerSelector = ".top-row__hamburger";
    const closeButtonSelector = ".menu__close-button";
    const menuLinkSelector = ".menu__link";

    [closeButtonSelector, menuLinkSelector].forEach((closeSelector) => {
      it(`shows the menu when hamburger is clicked and hides it when ${closeSelector} is clicked`, () => {
        const $menu = $(".menu");
        $menu.hide();
        expect($menu).toBeHidden();

        $(hamburgerSelector).click();
        expect($menu).toBeVisible();

        $(closeSelector).click();
        expect($menu).toBeHidden();
      });
    });

    it("locks <body> when open, and restores it on close", () => {
      const $body = $("body");
      $body.css("height", "2000px");
      expect($body.css("position")).toEqual("static");

      $body.scrollTop(10);
      $(hamburgerSelector).click();
      expect($body.css("position")).toEqual("fixed");
      expect($body.scrollTop()).toBe(0);

      $(closeButtonSelector).click();
      expect($body.css("position")).toEqual("static");
      expect($body.scrollTop()).toBe(10);
    });
  });

  describe("countdown", () => {
    it("shows the time remaining", () => {
      expect($(".days").html()).toEqual("00");
      expect($(".hours").html()).toEqual("15");
      expect($(".minutes").html()).toEqual("38");
      expect($(".seconds").html()).toEqual("55");
    });

    it("hides the countdown when it's finished", () => {
      jasmine.clock().mockDate(new Date(2017, 4, 5));
      setup();
      expect($(".countdown")).toBeHidden();
    });
  });

  describe("links", () => {
    it("makes all external links open in a new tab", () => {
      expect($("#external-link")).toHaveAttr("target", "_blank");
    });

    it("makes internal links open in the same tab", () => {
      expect($("#internal-link")).not.toHaveAttr("target");
    });
  });
});
