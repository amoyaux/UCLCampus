// Karma configuration
// Generated on Sun Jun 05 2016 21:57:53 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        '../www/lib/ionic/js/ionic.bundle.min.js',
        '../www/lib/angular-translate/angular-translate.min.js',
        '../www/lib/onezone-datepicker/dist/onezone-datepicker.min.js',
        '../www/lib/angular-mocks/angular-mocks.js',
        '../www/lib/angular-cookies/angular-cookies.js',
        '../www/js/ng-cordova.min.js',
        '../www/js/app.js',
        '../www/js/factory.js',
        '../www/settings/js/settings.js',
        '../www/settings/campusSelection/js/campusSelection.js',
        '../www/settings/login/js/constants.js',
        '../www/settings/login/js/services.js',
        '../www/settings/login/js/login.js',
        '../www/student/js/student.js',
        '../www/student/libraries/js/libraries.js',
        '../www/student/halls/js/halls.js',
        '../www/student/schedule/js/schedule.js',
        '../www/campus/js/campus.js',
        '../www/campus/events/js/events.js',
        '../www/campus/cafetaria/js/cafetaria.js',
        '../www/campus/cafetaria/js/utils.js',
        '../www/campus/sports/js/sports.js',
        '../www/campus/events/events_details/js/events_details.js',
        '../www/tools/js/tools.js',
        '../www/lib/leaflet/leaflet.js',
        '../www/lib/leaflet-plugins/layer/Marker.Rotate.js',
        '../www/lib/leaflet.awesome-markers/dist/leaflet.awesome-markers.js',
        '../www/lib/leaflet.markercluster/dist/leaflet.markercluster.js',
        '../www/tools/maps/js/data/auditoriums.js',
        '../www/tools/maps/js/data/entertainment.js',
        '../www/tools/maps/js/data/transport.js',
        '../www/tools/maps/js/data/locations.js',
        '../www/tools/maps/js/controllers/maps.js',
        '../www/tools/maps/js/services/buildings.js',
        '../www/tools/maps/js/services/geolocation.js',
        '../www/tools/maps/js/services/data.js',
        '../www/tools/maps/js/controllers/search.js',
        '../www/tools/maps/js/directives/category.js',
        '../www/tools/maps/js/directives/closeMenu.js',
        '../www/tools/maps/js/services/urlmatcher.js',
        '../www/town/js/town.js',
        './Controllers/controllers.test.js'
        ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
