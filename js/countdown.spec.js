'use strict'

import countdown from "./countdown";

describe("countdown", () => {
  let callback;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2017, 4, 4));
    callback = jasmine.createSpy("callback");
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("returns the zero-padded days/hrs/etc left until the end date", () => {
    countdown("5/5/2017 20:15", callback);
    expect(callback).toHaveBeenCalledWith(["01", "20", "15", "00"]);
  });

  it("updates every second", () => {
    countdown("5/5/2017", callback);
    expect(callback).toHaveBeenCalledTimes(1);

    jasmine.clock().tick(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jasmine.clock().tick(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("returns null when the countdown is over", () => {
    countdown("5/4/2017", callback);
    expect(callback).toHaveBeenCalledWith(null);
  });
});
