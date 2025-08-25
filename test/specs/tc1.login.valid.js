import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC1: Login functionality - Valid login', () => {
    it('should login with valid credentials', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login with valid credentials');
        await loginPage.login('standard_user', 'secret_sauce');

        await step('Verify inventory page is displayed');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();
        await expect(browser).toHaveUrlContaining('/inventory.html'); 
    });
});



