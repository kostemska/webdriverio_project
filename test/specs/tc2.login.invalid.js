import loginPage from '../pageobjects/login.page.js';
import { step } from '../utils/utils.js';

describe('TC2: Login functionality - Invalid password', () => {
    it('should show error for invalid password', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Enter valid username');
        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');

        await step('Enter invalid password');
        await loginPage.inputPassword.setValue('wrong_pass123');
        await expect(loginPage.inputPassword).toHaveValue('wrong_pass123');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        await step('Click Login button');
        await loginPage.btnLogin.click();

        await step('Verify error message and highlighted fields');
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
        await expect(loginPage.inputUsername).toHaveElementClassContaining('error');
        await expect(loginPage.inputPassword).toHaveElementClassContaining('error');
    });
});



