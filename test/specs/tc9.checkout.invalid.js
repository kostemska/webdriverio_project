import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import { step } from '../utils/utils.js';

describe('TC9: Checkout with empty cart', () => {

    before(async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login as standard_user');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should not allow checkout with empty cart', async () => {
        await step('Go to cart page');
        await inventoryPage.goToCart();

        await step('Verify cart is empty');
        const itemsCount = await cartPage.getNumberOfItems();
        await expect(itemsCount).toBe(0);

        await step('Click Checkout');
        await cartPage.checkout();

        await step('Verify empty cart message');
        const isEmptyMessageDisplayed = await cartPage.isEmptyCartMessageDisplayed();
        await expect(isEmptyMessageDisplayed).toBe(true);
    });

    after(async () => {
        await browser.deleteSession();
    });

});



