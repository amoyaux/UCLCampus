exports.config = {  
        capabilities: {
            'browserName': 'chrome',
            'chromeOptions': {                
                args: ['--disable-web-security'],
                prefs: {'profile.managed_default_content_settings.geolocation': 1}
            } 
        },
        baseUrl: 'http://localhost:8100',
        specs: [
            'e2e/**/*.tests.js'
        ],
        jasmineNodeOpts: {
            isVerbose: true,
        }
};