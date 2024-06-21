const {Builder, By, Key} = require("selenium-webdriver");
const assert = require("assert");
const webdriver = require("selenium-webdriver");

let invalidLoginInfo = [       //data of the possible invalid users
    { username: "", password: "SuperSecretPassword!" },
    { username: "tomsmith", password: "" },
    { username: "", password: "" },
    { username: "username", password: "SuperSecretPassword!" },
    { username: "tomsmith", password: "supersecretpassword!" },
    { username: "TOMSMITH", password: "SuperSecretPassword!" }
];
describe("Negative tests", ()=>{

    //test for the login of the invalid users
    invalidLoginInfo.forEach((invalidUser)=>{
        //calling negative_test function for each user of the invalidLoginInfo array
        it(`Unsuccessful login test: username = '${invalidUser.username}', password = '${invalidUser.password}'`, async ()=>{
            let driver =  await new Builder().forBrowser("chrome").build();
            await driver.get("https://the-internet.herokuapp.com/login");
            await driver.findElement(By.id("username")).sendKeys(invalidUser.username);
            await driver.findElement(By.id("password")).sendKeys(invalidUser.password);
            await driver.findElement(By.className("radius")).click();
            let msg = await driver.findElement(By.id("flash")).getText();
            if(invalidUser.username!="tomsmith"){ //checking if the username is incorrect for this user from invalidLoginInfo
                assert.equal(msg.includes("Your username is invalid!"), true);//checking if the error is displayed for incorrect username
            }else if(invalidUser.password!="SuperSecretPassword!"){//checking if the password is incorrect for this user from invalidLoginInfo
                assert.equal(msg.includes("Your password is invalid!"), true);//checking if the error is displayed for incorrect password
            }
            assert.equal(await driver.getCurrentUrl(), "https://the-internet.herokuapp.com/login"); //checking if user remains on the login page
            await driver.quit();
    });

});

})


