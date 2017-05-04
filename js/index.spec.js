'use strict';

import $ from "jquery";
import setup from "./index.js";

describe("The UI", () => {
  beforeEach(() => {
    loadFixtures("page.html");
    setup();
  });

  it("shows the menu on hamburger click", () => {
    $(".menu").hide();
    expect($(".menu")).toBeHidden();

    $(".top-row__hamburger").click();
    expect($(".menu")).not.toBeHidden();
  });
});
