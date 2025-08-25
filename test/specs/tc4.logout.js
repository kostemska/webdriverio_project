import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC4: Logout functionality', () => {
    it('should logout and redirect to login page', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login with valid credentials');
        await loginPage.login('standard_user', 'secret_sauce');

        await step('Verify inventory page is displayed');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Open burger menu');
        await inventoryPage.openBurgerMenu();

        await step('Click Logout');
        await inventoryPage.logout();

        await step('Verify redirect to login page');
        await expect(browser).toHaveUrlContaining('/');
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });
});











