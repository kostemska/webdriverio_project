import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { expect } from 'chai';
import allureReporter from '@wdio/allure-reporter';

const STEP_DELAY = 2000;

// Функція для логування кроків та паузи
async function step(description) {
    console.log(description);
    allureReporter.addStep(description);
    await browser.pause(STEP_DELAY);
}

describe('TC1: Login functionality - Valid login', () => {
    it('should login with valid credentials', async () => {
        // Крок 1: Відкрити сторінку логіну
        await step('Крок 1: Open login page');
        await LoginPage.open();

        // Крок 2: Ввести ім’я користувача
        await step('Крок 2: Enter username');
        await LoginPage.inputUsername.setValue('standard_user');
        const username = await LoginPage.inputUsername.getValue();
        
        //Перевірити, що ім’я введене правильно
        expect(username).to.equal('standard_user');

        // Крок 3: Ввести пароль
        await step('Крок 3: Enter password');
        await LoginPage.inputPassword.setValue('secret_sauce');
        
        // Перевірити, що введені дані користувача не видно, а відображаються як "крапки"
        const passwordType = await LoginPage.inputPassword.getAttribute('type');
        expect(passwordType).to.equal('password');

        // Крок 4: Натиснути кнопку Login
        await step('Крок 4: Click Login button');
        await LoginPage.btnLogin.click();

        // Крок 5: Перевірка відображення сторінки інвентарю
        await step('Крок 5: Verify inventory page');

        // Перевірити, що користувач успішно залогінився
        expect(await InventoryPage.inventoryContainer.isDisplayed()).to.be.true;
        expect(await InventoryPage.cartIcon.isDisplayed()).to.be.true;
        const url = await browser.getUrl();
        expect(url).to.include('/inventory.html');

        // Крок 6: Коротка пауза для перегляду результату
        await step('Крок 6: Short pause to see the result');
        await browser.pause(1000);
    });
});




