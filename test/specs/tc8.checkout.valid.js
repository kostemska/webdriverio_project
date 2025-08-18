import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import { expect } from 'chai';

describe('TC8 E2E - Complete valid checkout', () => {

    before(async () => {
        await LoginPage.open();
        await browser.pause(2000); // бачимо сторінку відкритою
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(2000); // бачимо введення логіну
        const isInventoryDisplayed = await LoginPage.inventoryContainer.isDisplayed();
        expect(isInventoryDisplayed).to.be.true;
    });

    it('should complete checkout with valid data', async () => {
        // 1. Додаємо перший продукт у кошик
        await InventoryPage.addToCartButtons[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(1000);
        await InventoryPage.addToCartButtons[0].click();
        await browser.pause(1500);

        const addedProductName = await InventoryPage.productNames[0].getText();

        const cartCount = await InventoryPage.cartBadge.getText();
        expect(cartCount).to.equal('1');

        // 2. Переходимо у кошик
        await InventoryPage.cartButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(1000);
        await InventoryPage.cartButton.click();
        await browser.pause(2000);

        const cartHeaderText = await CartPage.cartHeader.getText();
        expect(cartHeaderText).to.include('Your Cart');

        const cartItemName = await CartPage.cartItems[0].$('.inventory_item_name').getText();
        expect(cartItemName).to.equal(addedProductName);

        // 3. Checkout
        await CartPage.checkoutButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(1000);
        await CartPage.checkoutButton.click();
        await browser.pause(2000);

        const checkoutHeaderText = await CheckoutPage.checkoutHeader.getText();
        expect(checkoutHeaderText).to.include('Checkout');

        // 4. Заповнюємо форму
        await CheckoutPage.firstNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await CheckoutPage.firstNameInput.setValue('Alona');
        await browser.pause(500);

        await CheckoutPage.lastNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await CheckoutPage.lastNameInput.setValue('Tester');
        await browser.pause(500);

        await CheckoutPage.postalCodeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await CheckoutPage.postalCodeInput.setValue('12345');
        await browser.pause(500);

        // 5. Continue -> Overview
        await CheckoutPage.continueButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(500);
        await CheckoutPage.continueButton.click();
        await browser.pause(2000);

        const overviewHeaderText = await CheckoutPage.overviewHeader.getText();
        expect(overviewHeaderText).to.include('Checkout: Overview');

        const overviewItemName = await CheckoutPage.overviewItems[0].$('.inventory_item_name').getText();
        expect(overviewItemName).to.equal(addedProductName);

        // 6. Finish -> Complete
        await CheckoutPage.finishButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(500);
        await CheckoutPage.finishButton.click();
        await browser.pause(2000);

        // Перевірка заголовку
        const completeHeaderText = await CheckoutPage.completeHeader.getText();
        expect(completeHeaderText).to.include('Checkout: Complete!');

        // Перевірка повідомлення про завершення замовлення
        const completeMessageElement = await $('.complete-text');
        const isCompleteMessageDisplayed = await completeMessageElement.isDisplayed();
        expect(isCompleteMessageDisplayed).to.be.true;

        // 7. Back Home
        await CheckoutPage.backHomeButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await browser.pause(500);
        await CheckoutPage.backHomeButton.click();
        await browser.pause(2000);

        const inventoryHeaderText = await InventoryPage.inventoryHeader.getText();
        expect(inventoryHeaderText).to.include('Products');

        // Перевірка, що кошик порожній
        const cartBadgeExists = await InventoryPage.cartBadge.isExisting();
        expect(cartBadgeExists).to.be.false;
    });

    after(async () => {
        await browser.deleteSession();
    });

});

