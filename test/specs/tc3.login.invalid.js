import loginPage from '../pageobjects/login.page.js';
import { step } from '../utils/utils.js';

describe('TC3: Login functionality - Invalid username', () => {
    it('should show error for invalid username', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Enter invalid username');
        const invalidUsername = 'standarD_user';
        await loginPage.inputUsername.setValue(invalidUsername);
        await expect(loginPage.inputUsername).toHaveValue(invalidUsername);

        await step('Enter valid password');
        const validPassword = 'secret_sauce';
        await loginPage.inputPassword.setValue(validPassword);
        await expect(loginPage.inputPassword).toHaveValue(validPassword);
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');

        await step('Click Login button');
        await loginPage.btnLogin.click();

        await step('Verify error message and highlighted fields');
        await expect(loginPage.errorMessage).toBeDisplayed();
        await expect(loginPage.errorMessage).toHaveTextContaining(
            'Epic sadface: Username and password do not match any user in this service'
        );
        await expect(loginPage.inputUsername).toHaveElementClass('error');
        await expect(loginPage.inputPassword).toHaveElementClass('error');
    });
});





