describe('Clicking on the login button ', function(){  
    var username, password, loginButton;

    beforeEach(function() {
        browser.get('/#/app/login');
        username = element(by.model('data.username'));
        password = element(by.model('data.password'));
        loginButton = element(by.css('[ng-click="login(data)"]'))
    });

    it('should validate the credentials for a successful login and display the home view', function() {
        username.sendKeys('admin');
        password.sendKeys('1');

        loginButton.click().then(function() {
            browser.sleep(3000);
            expect(browser.getLocationAbsUrl()).toMatch('/app/home');
        });
    })

    it('should return to login page for unsuccessful credentials', function() {
        username.sendKeys('admin');
        password.sendKeys('2');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/app/login');
        });
    });
});