import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckersPage extends BasePage {
  private readonly _title: Locator;
  private readonly _message: Locator;
  private readonly _restartLink: Locator;
  private readonly _rulesLink: Locator;

  constructor(page: Page) {
    super(page);
    this._title = page.locator('h1');
    this._message = page.locator('#message');
    this._restartLink = page.locator("text=Restart");
    this._rulesLink = page.locator('a[href="https://en.wikipedia.org/wiki/English_draughts#Starting_position"]');
  }

  // Getters
  get title() {
    return this._title.textContent();
  }

  get message() {
    return this._message.textContent();
  }

  getMessageLocator(msg: string) {
    return this.page.locator(`#message:has-text("${msg}")`);
  }


  // Actions
  async clickRestartLink() {
    await this._restartLink.click();
  }

  async clickRulesLink() {
    await this._rulesLink.click();
  }

  // Helpers

  /*
  Helper to get current board state by elemtnt
  Get all elements by selectors
  Map them by name and src attributes
  Return the items sorted by name to keep them in order (this got me) 
  */
  async getBoardState() {
    const elements = await this.page.locator('#board div.line img').elementHandles();
    const items = await Promise.all(
      elements.map(async (el) => {
        const name = (await el.getAttribute('name')) ?? '';
        const src = (await el.getAttribute('src')) ?? '';
        return { name, src };
      })
    );
    // Keep in order by square name
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }

  /* 
  Helper to find if the board has changed from a previous state.
  ** Arg: prev - Pass in the previous board state as an object with name and src properties.
  Grab all elements by selector
  Map the elements by name and src attributes to compare from the previous state
  we stringify the new current state and compare to the previous state. 
  the comparison should return a truthy value for the waitForFunction to resolve.
  */
  async waitForBoardChange(prev) {
    await this.page.waitForFunction(
      (prevSerialized) => {
        const imgs = Array.from(document.querySelectorAll('#board div.line img'));
        const now = imgs
          .map(el => ({ name: el.getAttribute('name') || '', src: el.getAttribute('src') || '' }))
          .sort((a, b) => a.name.localeCompare(b.name));
        return JSON.stringify(now) !== prevSerialized;
      },
      JSON.stringify(prev),
      { timeout: 10_000 }
    );
  }
}