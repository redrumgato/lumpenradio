'use strict';

import $ from "jquery";
import setup from "./index.js";

describe("The UI", () => {
  beforeEach(() => {
    loadFixtures("page.html");
    setup();
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

      $body.scrollTop(1);
      $(hamburgerSelector).click();
      expect($body.css("position")).toEqual("fixed");
      expect($body.scrollTop()).toBe(0);

      $(closeButtonSelector).click();
      expect($body.css("position")).toEqual("static");
      expect($body.scrollTop()).toBe(1);
    });
  });
});
