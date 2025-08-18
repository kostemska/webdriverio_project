import LoginPage from '../pageobjects/login.page.js';
import { expect } from 'chai';
import allureReporter from '@wdio/allure-reporter';

// Параметрична затримка (в мс)
const STEP_DELAY = 2000; // 2 секунди

// Функція для паузи з логом
async function step(description) {
    console.log(description);
    allureReporter.addStep(description);
    await browser.pause(STEP_DELAY);
}

describe('TC3: Login functionality - Invalid username', () => {
    it('should show error for invalid username', async () => {
        // Крок 1: Відкрити сторінку
        await step('Step 1: Open login page');
        await LoginPage.open();

        // Крок 2: Ввести неправильний логін
        await step('Step 2: Enter invalid username');
        const invalidUsername = 'standarD_user';
        await LoginPage.inputUsername.setValue(invalidUsername);
        const usernameValue = await LoginPage.inputUsername.getValue();
        expect(usernameValue).to.equal(invalidUsername);
        console.log('Invalid Username entered:', usernameValue);

        // Крок 3: Ввести правильний пароль
        await step('Step 3: Enter valid password');
        const validPassword = 'secret_sauce';
        await LoginPage.inputPassword.setValue(validPassword);
        const passwordValue = await LoginPage.inputPassword.getValue();
        expect(passwordValue).to.equal(validPassword);
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).to.equal('password');
        console.log('Password entered (masked):', '*'.repeat(passwordValue.length));

        // Крок 4: Клік по кнопці Login
        await step('Step 4: Click Login button');
        await LoginPage.btnLogin.click();

        // Крок 5: Перевірка повідомлення про помилку та UI
        await step('Step 5: Verify error message and highlighted fields');
        expect(await LoginPage.errorMessage.isDisplayed()).to.be.true;
        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).to.include('Epic sadface: Username and password do not match any user in this service');
        expect(await LoginPage.inputUsername.getAttribute('class')).to.include('error');
        expect(await LoginPage.inputPassword.getAttribute('class')).to.include('error');
        console.log('Error message and field highlights verified');

        // Крок 6: Коротка затримка перед закриттям браузера
        await step('Step 6: Short pause to see the result');
        await browser.pause(1000);
        console.log('Short pause finished');
    });
});




