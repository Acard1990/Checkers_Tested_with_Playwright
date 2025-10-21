import { expect, test } from '@playwright/test';
import { CheckersPage } from '../../pages/CheckersPage';

test.describe.configure({ mode: 'parallel' });
test.describe('Checkers Gameplay', () => {
  const checkersUrl = "https://www.gamesforthebrain.com/game/checkers/";
  let checkersPage: CheckersPage;

  test.beforeEach(async ({ page }) => {
    checkersPage = new CheckersPage(page);
    await checkersPage.navigateTo(checkersUrl);
  });

  /* 
  Array of objects that specifies a series of moves in the format {start: number, end: number}.
  I grabbed these by manually playing through a game.
  */
  const myMoves = [
    { start: 62, end: 53 },
    { start: 22, end: 33 },
    { start: 71, end: 62 },
    { start: 31, end: 13 },
    { start: 62, end: 73 },
    { start: 51, end: 62 },
    { start: 11, end: 22 },
    { start: 60, end: 71 },
    { start: 40, end: 51 },
    { start: 20, end: 31 },
    { start: 53, end: 44 },
    { start: 62, end: 44 },
    { start: 13, end: 24 },
  ];

  test('Validate online player can make multiple valid moves against opponent', async ({ page }) => {
    // create a loop of test.steps from the myMoves array
    // declare start and end locators using myMoves array
    // expect the start locator to have the correct piece before the move using its src attribute 
    // click the start and end locators to make the move
    // expect the start locator to have the empty src attribute which should be blank or gray git
    // expect the end locator has the src attribute you 1 gif
  });

  test('Validate board does not change with invalid move', async ({ page }) => {
    const start = page.locator(`[name="space${myMoves[0].start}"]`);
    const end = page.locator(`[name="space${myMoves[3].end}"]`); // invalid move

    await expect(start).toHaveAttribute('src', /you\d\.gif$/i);

    await start.click();
    await end.click();

    // asserts that the move never happened by checking the src of the start element
    await expect(start).toHaveAttribute('src', /you\d\.gif$/i);

    // asserts the end located is still empty
    await expect(end).toHaveAttribute('src', /(blank|gray|empty)\.gif$/i);
  });

  test('Validate the board changes after opponent bot moves', async ({ page }) => {
    const before = await checkersPage.getBoardState();

    const start = page.locator(`[name="space${myMoves[0].start}"]`);
    const end = page.locator(`[name="space${myMoves[0].end}"]`);
    await start.click();
    await end.click();

    // Wait for board to change after the opponent moves
    await checkersPage.waitForBoardChange(JSON.stringify(before));
  });
});