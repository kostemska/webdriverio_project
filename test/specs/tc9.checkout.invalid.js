import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('TC9 E2E - Checkout with empty cart', () => {
    it('should not allow checkout with empty cart', async () => {
        // 1. Відкриваємо логін сторінку
        await LoginPage.open();
        await browser.pause(1000); 

        // 2. Логін користувача
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(2000);

        // 3. Переходимо у кошик
        await InventoryPage.cartButton.waitForDisplayed({ timeout: 2000 });
        await InventoryPage.cartButton.click();
        await browser.pause(1000);

        // 4. Перевірка, що ми на сторінці кошика
        await CartPage.cartHeader.waitForDisplayed({ timeout: 2000 });
        const cartHeaderText = await CartPage.cartHeader.getText();
        expect(cartHeaderText).to.equal('Your Cart');
        await browser.pause(1000);

        // 5. Переконуємося, що кошик порожній
        const itemsCount = await CartPage.cartItems.length;
        expect(itemsCount).to.equal(0);
        await browser.pause(1000);

        // 6. Натискаємо Checkout
        await CartPage.checkoutButton.waitForClickable({ timeout: 2000 });
        await CartPage.checkoutButton.click();
        await browser.pause(1000);

        // 7. Перевірка: з'являється повідомлення про порожній кошик
        await CartPage.emptyCartMessage.waitForDisplayed({ timeout: 1000 });
        const isEmptyCartMessageDisplayed = await CartPage.emptyCartMessage.isDisplayed();
        expect(isEmptyCartMessageDisplayed).to.be.true;

        const emptyCartMessageText = await CartPage.emptyCartMessage.getText();
        expect(emptyCartMessageText).to.equal('Cart is empty');
    });
});

