import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import { step } from '../utils/utils.js';

describe('TC8: Complete valid checkout', () => {

    before(async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login as standard_user');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('should complete checkout with valid data', async () => {
        await step('Verify inventory page is displayed');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Add first product to cart');
        await inventoryPage.addFirstProductToCart();

        const addedProductName = await inventoryPage.getFirstProductName();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await step('Go to cart page');
        await inventoryPage.goToCart();
        await expect(cartPage.cartHeader).toHaveTextContaining('Your Cart');

        const cartItemName = await cartPage.getCartItemName(0);
        await expect(cartItemName).toBe(addedProductName);

        await step('Checkout - fill info');
        await cartPage.checkout();
        await checkoutPage.fillCheckoutForm('Alona', 'Tester', '12345');

        await step('Continue to overview');
        await checkoutPage.continue();
        const overviewItemName = await checkoutPage.getOverviewItemName(0);
        await expect(overviewItemName).toBe(addedProductName);

        await step('Finish checkout');
        await checkoutPage.finish();
        await expect(checkoutPage.completeHeader).toHaveTextContaining('Checkout: Complete!');
        await expect(checkoutPage.thankYouMessage).toBeDisplayed();

        await step('Back Home');
        await checkoutPage.backHome();
        await expect(inventoryPage.inventoryHeader).toHaveTextContaining('Products');
        await expect(inventoryPage.cartBadge).not.toBeExisting();
    });

    after(async () => {
        await browser.deleteSession();
    });

});
