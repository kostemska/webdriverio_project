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

        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
    });

    it('should not allow checkout with empty cart', async () => {
        await step('Go to cart page');
        await inventoryPage.cartButton.click();
        await expect(cartPage.cartHeader).toHaveTextContaining('Your Cart');

        await step('Verify cart is empty');
        const itemsCount = await cartPage.cartItems.length;
        expect(itemsCount).toBe(0);
        
        await step('Click Checkout');
        await cartPage.checkoutButton.click();

        await step('Verify empty cart message');
        await expect(cartPage.emptyCartMessage).toBeDisplayed();
        await expect(cartPage.emptyCartMessage).toHaveText('Cart is empty');
    });

    after(async () => {
        await browser.deleteSession();
    });

});


