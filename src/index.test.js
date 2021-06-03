/**
 * @jest-environment jsdom
 */

import { XHRequest, rivraddon } from ".";

const tracker      = "https://tracker.simplaex-code-challenge.com"
const rv_analytics = "SIMPLAEX CODE CHALLENGE LOG rivraddonanalytics.enableAnalytics"

beforeEach(() => { jest.restoreAllMocks() });

it("Is there a message printed to the console?", () => {
  global.console = {
    log: jest.fn()
  };
  rivraddon.analytics.enableAnalytics();
  expect(global.console.log).toHaveBeenCalledWith(
    rv_analytics
  );
});

it("Is XHRequest.post called upon trackPbjsEvent?", async () => {
  XHRequest.post = jest.fn(() => new Promise(resolve => resolve(true)));
  rivraddon.analytics.trackPbjsEvent({ eventType: "TEST" });
  expect(XHRequest.post).toHaveBeenCalledWith(tracker, {
    eventType: "TEST"
  });
});

it("Is promise being fulfilled?", async () => {
  XHRequest.post = jest.fn(() => new Promise(resolve => resolve(true)));
  await expect(XHRequest.post("TEST", {})).resolves.toBe(true);
});

it("Is bad promise get rejected?", async () => {
  XHRequest.post = jest.fn(
    () => new Promise((resolve, reject) => reject(true))
  );
  await expect(XHRequest.post("TEST", {})).rejects.toBe(true);
});
