import { html, fixture, expect } from '@open-wc/testing';
import "../dashboard-comp.js";

describe("DashboardComp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <dashboard-comp
        title="title"
      ></dashboard-comp>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
