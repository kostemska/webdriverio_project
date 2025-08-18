import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { expect } from 'chai';
import allureReporter from '@wdio/allure-reporter';

const STEP_DELAY = 2000;

async function step(description, pauseTime = STEP_DELAY) {
    console.log(description);
    allureReporter.addStep(description);
    await browser.pause(pauseTime);
}

describe('TC5: Add to cart, logout, login again and check cart', () => {
    it('should add product, logout, login again, and verify cart', async () => {
        try {
            // Крок 1: Відкрити логін сторінку та логін
            await step('Open login page');
            await LoginPage.open();
            await LoginPage.inputUsername.waitForDisplayed({ timeout: 2000 });
            await LoginPage.inputUsername.setValue('standard_user');
            await LoginPage.inputPassword.setValue('secret_sauce');
            await LoginPage.btnLogin.waitForClickable({ timeout: 2000 });
            await LoginPage.btnLogin.click();

            // Перевірка інвентарю
            await InventoryPage.inventoryContainer.waitForDisplayed({ timeout: 2000 });
            expect(await InventoryPage.inventoryContainer.isDisplayed()).to.be.true;

            // Крок 2: Додати перший товар у кошик
            await step('Add first product to cart');
            await InventoryPage.addToCartButtons[0].click();
            const badgeText = await InventoryPage.cartBadge.getText();
            expect(badgeText).to.equal('1');

            // Крок 3: Відкрити бургер-меню через InventoryPage
            await step('Open burger menu');
            await InventoryPage.burgerMenu.waitForClickable({ timeout: 2000 });
            await InventoryPage.burgerMenu.click();

            const menuItems = await InventoryPage.menuItems;
            expect(menuItems.length).to.be.at.least(4);

            // Крок 4: Logout
            await InventoryPage.logoutBtn.waitForClickable({ timeout: 2000 });
            await InventoryPage.logoutBtn.click();

            // Крок 5: Логін знову
            await step('Login again');
            await LoginPage.inputUsername.waitForDisplayed({ timeout: 2000 });
            await LoginPage.inputUsername.setValue('standard_user');
            await LoginPage.inputPassword.setValue('secret_sauce');
            await LoginPage.btnLogin.waitForClickable({ timeout: 2000 });
            await LoginPage.btnLogin.click();

            // Перевірка інвентарю
            await InventoryPage.inventoryContainer.waitForDisplayed({ timeout: 2000 });
            expect(await InventoryPage.inventoryContainer.isDisplayed()).to.be.true;

            // Крок 6: Відкрити кошик і перевірити товар
            await step('Open cart page');
            await InventoryPage.cartButton.click();
            const cartItem = await InventoryPage.cartBadge;
            expect(await cartItem.isDisplayed()).to.be.true;

        } catch (error) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `errorShots/tc5.cart_${timestamp}.png`;
            await browser.saveScreenshot(filename);
            console.log(`❌ Screenshot saved: ${filename}`);
            throw error;
        }
    });
});


