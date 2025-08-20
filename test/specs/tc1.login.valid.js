import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC1: Login functionality - Valid login', () => {
    it('should login with valid credentials', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Enter username');
        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');

        await step('Enter password');
        await loginPage.inputPassword.setValue('secret_sauce');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        await step('Click Login button');
        await loginPage.btnLogin.click();

        await step('Verify inventory page is displayed');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
        await expect(inventoryPage.cartIcon).toBeDisplayed();
        await expect(browser).toHaveUrlContaining('/inventory.html'); 
    });
});


