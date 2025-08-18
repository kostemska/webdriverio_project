import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('TC4: Logout functionality', () => {
    it('should logout and redirect to login page', async () => {
        try {
            // 1. Відкрити логін сторінку
            await LoginPage.open();
            await LoginPage.inputUsername.waitForDisplayed({ timeout: 2000 });
            await LoginPage.inputUsername.setValue('standard_user');
            await LoginPage.inputPassword.setValue('secret_sauce');
            await LoginPage.btnLogin.waitForClickable({ timeout: 2000 });
            await LoginPage.btnLogin.click();

            // 2. Перевірка, що ми на сторінці інвентарю
            await InventoryPage.inventoryContainer.waitForDisplayed({ timeout: 2000 });
            expect(await InventoryPage.inventoryContainer.isDisplayed()).to.be.true;

            // 3. Відкрити бургер-меню через InventoryPage
            await InventoryPage.burgerMenu.waitForClickable({ timeout: 2000 });
            await InventoryPage.burgerMenu.click();

            const menuItems = await InventoryPage.menuItems;
            expect(menuItems.length).to.be.at.least(4); // тепер правильно працює з InventoryPage

            // 4. Клік по Logout
            await InventoryPage.logoutBtn.waitForClickable({ timeout: 2000 });
            await InventoryPage.logoutBtn.click();

            // 5. Перевірка, що повернулись на сторінку логіну
            const url = await browser.getUrl();
            expect(url).to.include('saucedemo.com/');
            expect(await LoginPage.inputUsername.getValue()).to.equal('');
            expect(await LoginPage.inputPassword.getValue()).to.equal('');

        } catch (error) {
            // Скріни лише при падінні
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `errorShots/tc4.logout_${timestamp}.png`;
            await browser.saveScreenshot(filename);
            console.log(`❌ Screenshot saved: ${filename}`);
            throw error;
        }
    });
});









