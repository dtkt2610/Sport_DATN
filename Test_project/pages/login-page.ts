import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage{
    cssLoginContainer = ".form-container.sign-in-container";
    cssUserName = "input[name='email'][placeholder='Email']";
    cssPassword = "input[name='password'][placeholder='Password']";
    cssBtnLogin = ".button-login";
    cssClickLoginDrop = "#dropdown-basic-button";
    cssClickLoginPage = "a:text('Đăng nhập')";


    constructor (page: Page){
        super(page);
    }

    // Login method
     async clickUserDropdown() {
        await this.page.click(this.cssClickLoginDrop);
    }

    async clickLoginOption() {
        await this.page.click(this.cssClickLoginPage);
    }

    async openLoginPageFromDropdown() {
        await this.clickUserDropdown();
        await this.clickLoginOption();
    }
    get loginContainer(){
        return this.page.locator(this.cssLoginContainer);
    }

    async fillUserName (email: string){
        await this.loginContainer.waitFor({ state: 'visible', timeout: 5000 });
        const emailField = this.loginContainer.locator(this.cssUserName);
        await emailField.fill(email);
    }

    async fillPassWord (password: string){
       const passwordField = this.loginContainer.locator(this.cssPassword);
        await passwordField.fill(password);
    }

    async clickBtnLogin (){
        await this.loginContainer.locator(this.cssBtnLogin).click();   
    }
        
    async Login (username: string, password){
        await this.fillUserName(username);
        await this.fillPassWord(password);
        await this.clickBtnLogin();
    }
}