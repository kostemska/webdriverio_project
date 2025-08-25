import loginPage from '../pageobjects/login.page.js';
import { step } from '../utils/utils.js';

describe('TC3: Login functionality - Invalid username', () => {
    it('should show error for invalid username', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Attempt login with invalid username');
        await loginPage.login('standarD_user', 'secret_sauce');

        await step('Verify error message and highlighted fields');
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
        await expect(loginPage.inputUsername).toHaveElementClass('error');
        await expect(loginPage.inputPassword).toHaveElementClass('error');
    });
});






