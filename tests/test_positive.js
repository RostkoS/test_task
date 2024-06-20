const {Builder, By, Key, Options} = require("selenium-webdriver");
const assert = require("assert");

async function test_positive()
{
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://the-internet.herokuapp.com/login");
        await driver.findElement(By.id("username")).sendKeys("tomsmith")
        await driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!", Key.RETURN);
        let msg = await driver.findElement(By.xpath("//*[@id=\"flash\"]")).getText();
        assert.equal(msg.includes("You logged into a secure area!"), true);
        assert.equal(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/secure");

        await driver.quit();
}

test_positive();

