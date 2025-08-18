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

describe('TC2: Login functionality - Invalid password', () => {
    it('should show error for invalid password', async () => {
        // Крок 1: Відкрити сторінку
        await step('Step 1: Open login page');
        await LoginPage.open();

        // Крок 2: Ввести логін
        await step('Step 2: Enter valid username');
        await LoginPage.inputUsername.setValue('standard_user');
        const username = await LoginPage.inputUsername.getValue();
        expect(username).to.equal('standard_user');
        console.log('Username entered:', username);

        // Крок 3: Ввести неправильний пароль
        await step('Step 3: Enter invalid password');
        const invalidPassword = 'wrong_pass123';
        await LoginPage.inputPassword.setValue(invalidPassword);
        const passwordValue = await LoginPage.inputPassword.getValue();
        expect(passwordValue).to.equal(invalidPassword);
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).to.equal('password'); // перевірка, що введене як точки
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



