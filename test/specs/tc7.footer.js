import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { expect } from 'chai';

describe('TC7 E2E - Verify footer social links', () => {

    before(async () => {
        // Відкриваємо сайт
        await LoginPage.open();
        await browser.pause(2000); // бачимо головну сторінку

        // Логін
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.pause(2000); // бачимо введення логіну

        const isInventoryDisplayed = await LoginPage.inventoryContainer.isDisplayed();
        expect(isInventoryDisplayed).to.be.true;
    });

    it('should open Twitter, Facebook and LinkedIn from footer', async () => {
        // Плавна прокрутка до футера
        await browser.execute(() => {
            const footer = document.querySelector('footer');
            footer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        await browser.pause(2000); // 2 секунда пауза, щоб побачити прокрутку

        // Масив з соціальними іконками та точними URL
        const socialLinks = [
            { element: InventoryPage.twitterIcon, url: 'https://x.com/saucelabs' },
            { element: InventoryPage.facebookIcon, url: 'https://www.facebook.com/saucelabs' },
            { element: InventoryPage.linkedinIcon, url: 'https://www.linkedin.com/company/sauce-labs/' }
        ];

        for (let link of socialLinks) {
            const mainWindow = await browser.getWindowHandle();

            await link.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await browser.pause(1000); // 1 секунда пауза перед кліком
            await link.element.click();

            await browser.pause(1500); // пауза після кліку, щоб вкладка відкрилася

            const allWindows = await browser.getWindowHandles();
            const newWindow = allWindows.find(handle => handle !== mainWindow);
            await browser.switchToWindow(newWindow);

            // Перевірка точного URL
            const currentUrl = await browser.getUrl();
            expect(currentUrl).to.equal(link.url);

            await browser.pause(3000); // 3 сек пауза, щоб бачити відкриту вкладку
            await browser.closeWindow();
            await browser.switchToWindow(mainWindow);
            await browser.pause(1000); // коротка пауза перед наступним кліком
        }
    });

    after(async () => {
        await browser.deleteSession();
    });

});



