import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC7: Verify footer social links', () => {

    before(async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login as standard_user');
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
    });

    it('should open Twitter, Facebook and LinkedIn from footer', async () => {
        const socialLinks = [
            { element: inventoryPage.twitterIcon, url: 'https://x.com/saucelabs' },
            { element: inventoryPage.facebookIcon, url: 'https://www.facebook.com/saucelabs' },
            { element: inventoryPage.linkedinIcon, url: 'https://www.linkedin.com/company/sauce-labs/' }
        ];

        const mainWindow = await browser.getWindowHandle();

        for (let link of socialLinks) {
            await link.element.click();

            const allWindows = await browser.getWindowHandles();
            const newWindow = allWindows.find(handle => handle !== mainWindow);
            await browser.switchToWindow(newWindow);

            await expect(browser).toHaveUrl(link.url);

            await browser.closeWindow();
            await browser.switchToWindow(mainWindow);
        }
    });

    after(async () => {
        await browser.deleteSession();
    });

});




