import loginPage from '../pageobjects/login.page.js';
import { step } from '../utils/utils.js';

describe('TC2: Login functionality - Invalid password', () => {
    it('should show error for invalid password', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Attempt login with invalid password');
        await loginPage.login('standard_user', 'wrong_pass123');

        await step('Verify error message and highlighted fields');
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
        await expect(loginPage.inputUsername).toHaveElementClassContaining('error');
        await expect(loginPage.inputPassword).toHaveElementClassContaining('error');
    });
});



