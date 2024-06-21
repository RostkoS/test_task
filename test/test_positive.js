const {Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert");

describe("Positive test", function(){
    let driver;
    beforeEach( async function (){
        await new Builder().forBrowser("chrome").build();
    });
    //test for the login of the valid user "tomsmith" with password "SuperSecretPassword!"
    it("Successful login", async function(){
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://the-internet.herokuapp.com/login");
        await driver.findElement(By.id("username")).sendKeys("tomsmith");
        await driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!", Key.RETURN);
        let msg = await driver.findElement(By.xpath("//*[@id=\"flash\"]")).getText();
        assert.equal(msg.includes("You logged into a secure area!"), true);//checking the success message
        assert.equal(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/secure");//checking if the secure area is opened
        await driver.quit();
    });
});



