import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC7: Verify footer social links', () => {

    before(async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login as standard_user');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should open Twitter, Facebook and LinkedIn from footer', async () => {
        const socialLinks = [
            { element: inventoryPage.twitterIcon, url: 'https://x.com/saucelabs' },
            { element: inventoryPage.facebookIcon, url: 'https://www.facebook.com/saucelabs' },
            { element: inventoryPage.linkedinIcon, url: 'https://www.linkedin.com/company/sauce-labs/' }
        ];

        for (let link of socialLinks) {
            const mainWindow = await inventoryPage.openSocialLink(link.element);

            await expect(browser).toHaveUrl(link.url);

            await inventoryPage.closeAndReturn(mainWindow);
        }
    });
});






