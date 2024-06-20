const {Builder, By, Key, Options} = require("selenium-webdriver");
const assert = require("assert");

let invalidLoginInfo = [
    { username: "", password: "SuperSecretPassword!" },
    { username: "tomsmith", password: "" },
    { username: "", password: "" },
    { username: "username", password: "SuperSecretPassword!" },
    { username: "tomsmith", password: "supersecretpassword!" },
    { username: "TOMSMITH", password: "SuperSecretPassword!" }

];
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

async function negative_test(invalidUser) {

    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("https://the-internet.herokuapp.com/login");
        await driver.findElement(By.id("username")).sendKeys(invalidUser.username);
        await driver.findElement(By.id("password")).sendKeys(invalidUser.password);
        await driver.findElement(By.className("radius")).click();
        let msg = await driver.findElement(By.id("flash")).getText();
        if(invalidUser.username!="tomsmith"){
            assert.equal(msg.includes("Your username is invalid!"), true);
        }else if(invalidUser.password!="SuperSecretPassword!"){
            assert.equal(msg.includes("Your password is invalid!"), true);
        }
        assert.equal(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/login");

    } catch (err) {
        console.log(err);

    } finally {
        await driver.quit();
    }
}

test_positive();
runLoop = async () => {
    for (let i = 0; i < invalidLoginInfo.length; i++) {
        await negative_test(invalidLoginInfo[i]);
    }
};
runLoop();
