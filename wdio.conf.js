import { join, basename } from 'path';
import fs from 'fs';

export const config = {
    runner: 'local',
    specs: [
        './test/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--start-maximized']
        }
    }],
    logLevel: 'info',
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['devtools'], 
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    /**
     * Хук, який виконується після кожного тесту
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const screenshotsDir = join(process.cwd(), 'errorShots');
            if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir);
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            // Беремо ім'я файлу тесту
            const fileName = basename(test.file, '.js');

            const filename = join(screenshotsDir, `${fileName}_${timestamp}.png`);
            await browser.saveScreenshot(filename);
            console.log(`❌ Screenshot saved: ${filename}`);
        }
    }
};




