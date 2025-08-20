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

        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
    });

    it('should complete checkout with valid data', async () => {
        await step('Add first product to cart');
        await inventoryPage.addToCartButtons[0].click();

        const addedProductName = await inventoryPage.productNames[0].getText();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await step('Go to cart page');
        await inventoryPage.cartButton.click();
        await expect(cartPage.cartHeader).toHaveTextContaining('Your Cart');
        await expect(cartPage.cartItems[0].$('.inventory_item_name')).toHaveText(addedProductName);

        await step('Checkout - fill info');
        await cartPage.checkoutButton.click();
        await expect(checkoutPage.checkoutHeader).toHaveTextContaining('Checkout');

        await checkoutPage.firstNameInput.setValue('Alona');
        await checkoutPage.lastNameInput.setValue('Tester');
        await checkoutPage.postalCodeInput.setValue('12345');

        await step('Continue to overview');
        await checkoutPage.continueButton.click();
        await expect(checkoutPage.overviewHeader).toHaveTextContaining('Checkout: Overview');
        await expect(checkoutPage.overviewItems[0].$('.inventory_item_name')).toHaveText(addedProductName);

        await step('Finish checkout');
        await checkoutPage.finishButton.click();
        await expect(checkoutPage.completeHeader).toHaveTextContaining('Checkout: Complete!');
        await expect($('.complete-text')).toBeDisplayed();

        await step('Back Home');
        await checkoutPage.backHomeButton.click();
        await expect(inventoryPage.inventoryHeader).toHaveTextContaining('Products');
        await expect(inventoryPage.cartBadge).not.toBeExisting();
    });

    after(async () => {
        await browser.deleteSession();
    });

});

