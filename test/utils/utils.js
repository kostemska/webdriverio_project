import allureReporter from '@wdio/allure-reporter';

export async function step(description) {
    console.log(description);
    allureReporter.addStep(description);
}
