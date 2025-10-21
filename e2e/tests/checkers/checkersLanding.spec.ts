import { expect, test } from '@playwright/test';
import { CheckersPage } from '../../pages/CheckersPage';
import { GameMessages } from '../../enums/checkers_msg';

test.describe.configure({ mode: 'parallel' });
test.describe('Checkers Landing', () => {
    const checkersUrl = "https://www.gamesforthebrain.com/game/checkers/";
    const rulesUrl = "https://en.wikipedia.org/wiki/English_draughts#Starting_position";
    const titleText = "Checkers";

    let checkersPage: CheckersPage;

    test.beforeEach(async ({ page }) => {
        checkersPage = new CheckersPage(page);
        await checkersPage.navigateTo(checkersUrl);
    });

    test('Validate the correct title', async () => {
        await expect(checkersPage.titleTxt).resolves.toContain(titleText);
    });

    test('Validate the start game message on initial load', async () => {
        await expect(checkersPage.messageTxt).resolves.toContain(GameMessages.Start);
    });

    test('Validate the Restart link', async () => {
        await checkersPage.clickRestartLink();
        await checkersPage.getMessageLocator(GameMessages.Start).isVisible();
        // no clear api request or nav changes.... come on!
    });

    test('Validate the Rules link', async () => {
        await checkersPage.clickRulesLink();
        await expect(checkersPage.page).toHaveURL(rulesUrl);
    });
});