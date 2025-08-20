import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC4: Logout functionality', () => {
    it('should logout and redirect to login page', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Enter username and password');
        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');

        await loginPage.inputPassword.setValue('secret_sauce');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        await step('Click Login button');
        await loginPage.btnLogin.click();

        await step('Verify inventory page is displayed');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Open burger menu');
        await inventoryPage.burgerMenu.click();

        await step('Click Logout');
        await inventoryPage.logoutBtn.click();

        await step('Verify redirect to login page');
        await expect(browser).toHaveUrlContaining('/'); 
        await expect(loginPage.inputUsername).toHaveValue('');
        await expect(loginPage.inputPassword).toHaveValue('');
    });
});









