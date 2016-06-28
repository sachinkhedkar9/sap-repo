// Generated on 2016-03-21 using generator-jhipster 2.27.2
/* jshint camelcase: false */
// jshint ignore: start
/*author: i852127*/
'use strict';

var gulp = require('gulp'),
    prefix = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngConstant = require('gulp-ng-constant-fork'),
    jshint = require('gulp-jshint'),
    rev = require('gulp-rev'),
    proxy = require('proxy-middleware'),
    es = require('event-stream'),
    //flatten = require('gulp-flatten'),
    del = require('del'),
    url = require('url'),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    KarmaServer = require('karma').Server,
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    cache = require('gulp-cached'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    casperJs = require('gulp-casperjs'),
    handleErrors = require('./gulp/handleErrors'),
    util = require('./gulp/utils'),
    reload = browserSync.reload,
    debug = require('gulp-debug'); //Just for debugging the values we want in the gulp task.

var config = {
    app: '../webapp/',
    dist: '../service/src/main/resources/public/',
    test: 'test/karma-jasmine/',
    importPath: 'bower_components',
    scss: 'scss',
    casperPath:'test/casper/*.js',
    port: 9000,
    apiPort: 8080,
    liveReloadPort: 35729
};

gulp.task('clean', function () {
    return del([config.dist],{force:true});
});

gulp.task('unit-testing', ['wiredep:test', 'ngconstant:dev'], function (done) {
    new KarmaServer({
        configFile: __dirname + '/'+config.test + 'karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('copy', function () {
    return es.merge(  // copy i18n folders only if translation is enabled
        // gulp.src(config.app + 'i18n/**')
        //     .pipe(plumber({errorHandler: handleErrors}))
        //     .pipe(changed(config.dist + 'i18n/'))
        //     .pipe(gulp.dest(config.dist + 'i18n/')),
        gulp.src(config.app + 'assets/fonts/**/*.*')
            .pipe(plumber({errorHandler: handleErrors}))
            .pipe(changed(config.dist + 'assets/fonts/'))
            .pipe(gulp.dest(config.dist + 'assets/fonts/'))

    /*    gulp.src(config.app + 'bower_components/bootstrap-sass/assets/fonts/bootstrap/!*.*')
            .pipe(plumber({errorHandler: handleErrors}))
            .pipe(changed(config.dist + 'assets/fonts/bootstrap'))
            .pipe(gulp.dest(config.dist + 'assets/fonts/bootstrap')),

        gulp.src(config.app + 'bower_components/fontawesome/fonts/!*.*')
            .pipe(plumber({errorHandler: handleErrors}))
            .pipe(changed(config.dist + 'assets/fonts/'))
            .pipe(gulp.dest(config.dist + 'assets/fonts/')),*/

 /*       gulp.src(config.app + 'assets/!**!/!*.{woff,svg,ttf,eot}')
            .pipe(plumber({errorHandler: handleErrors}))
            .pipe(changed(config.dist + 'assets/fonts/'))
            .pipe(flatten())
            .pipe(gulp.dest(config.dist + 'assets/fonts/'))*/
            );
});

gulp.task('images', function () {
    return gulp.src(config.app + 'assets/images/**')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.dist + 'assets/images'))
        //.pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(config.dist + 'assets/images'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('del-sass', function () {
    return del([config.app + 'assets/styles']);
});

gulp.task('del-sassMain', function () {
    return del([config.app + 'styles/**/*.css']);
});

gulp.task('sassMain', ['del-sassMain'], function(){
    gulp.src(config.app+'/styles/main.scss')
        .pipe(debug({title: 'main found:'}))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [   config.scss
                // ,config.importPath+ '/bootstrap-sass/assets/stylesheets'
                // ,config.importPath + '/fontawesome/scss'
            ]
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(debug({title: 'SourceMap writing:'}))
        .pipe(gulp.dest(config.app+'/styles'))
        .pipe(reload({stream:true}));
});

gulp.task('sass', ['del-sass'],function () {
    return  gulp.src(config.scss+'/main.scss')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.app + 'assets/styles', {extension: '.css'}))
        .pipe(sass({
                //outputStyle:'compressed',
                includePaths:[
                    config.scss,
                    config.importPath+ '/bootstrap-sass/assets/stylesheets',
                    config.importPath + '/fontawesome/scss'
                ]
            })
            .on('error',sass.logError)
        )
        .pipe(gulp.dest(config.app + 'assets/styles'));

/*    return gulp.src(config.scss + '**!/!*.{scss,sass}')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(changed(config.app + 'assets/styles', {extension: '.css'}))
        .pipe(sass({includePaths: config.importPath}).on('error', sass.logError))
        .pipe(gulp.dest(config.app + 'assets/styles'));*/
});

gulp.task('styles', ['sass'], function () {
    return gulp.src(config.app + 'assets/styles')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('install', function (done) {
    runSequence('wiredep','inject-js', 'ngconstant:dev', 'sass', done);
});

gulp.task('serve', function () {
    runSequence('install', function () {
        var baseUri = 'http://localhost:' + config.apiPort;
        // Routes to proxy to the backend. Routes ending with a / will setup
        // a redirect so that if accessed without a trailing slash, will
        // redirect. This is required for some endpoints for proxy-middleware
        // to correctly handle them.
        var proxyRoutes = [
            //all the backend api that needs proxy
            '/usercontext',
            '/tenant',
            '/tokens'
        ];

        var requireTrailingSlash = proxyRoutes.filter(function (r) {
            return util.endsWith(r, '/');
        }).map(function (r) {
            // Strip trailing slash so we can use the route to match requests
            // with non trailing slash
            return r.substr(0, r.length - 1);
        });

        var proxies = [
            // Ensure trailing slash in routes that require it
            function (req, res, next) {
                requireTrailingSlash.forEach(function (route) {
                    if (url.parse(req.url).path === route) {
                        res.statusCode = 301;
                        res.setHeader('Location', route + '/');
                        res.end();
                    }
                });

                next();
            }
        ]
            .concat(
                // Build a list of proxies for routes: [route1_proxy, route2_proxy, ...]
                proxyRoutes.map(function (r) {
                    var options = url.parse(baseUri + r);
                    options.route = r;
                    options.preserveHost = true;
                    return proxy(options);
                }));

        browserSync({
            open: true,
            port: config.port,
            server: {
                baseDir: config.app,
                middleware: proxies
            },
            online:false
        });

        gulp.start('watch');
    });
});

gulp.task('watch', function () {
    gulp.watch('bower.json', ['wiredep']);
   // gulp.watch(['gulpfile.js', 'pom.xml'], ['ngconstant:dev']);
    gulp.watch(config.scss+'/**/*.scss', ['styles']);
    gulp.watch(config.app+'/**/*.scss', ['sassMain']);
    gulp.watch(config.app + 'assets/images/**', ['images']);
    gulp.watch([config.app + 'scripts/**/*.js',config.app + 'app.js'], ['jshint']);
    gulp.watch([config.app + '*.html', config.app + 'scripts/**', config.app + 'i18n/**/*.json', config.app + 'app.js',config.app + 'html/**/*.html',config.app+'assets/**/*.*']).on('change', browserSync.reload);
});

gulp.task('wiredep', ['wiredep:test', 'wiredep:app']);

gulp.task('wiredep:app', function () {
    var stream = gulp.src(config.app + 'index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(wiredep({
            exclude: [/angular-i18n/,
                        'bower_components/nanoscroller/']
        }))
        .pipe(gulp.dest(config.app));

    return es.merge(stream, gulp.src(config.scss + '*.{scss,sass}')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(wiredep({
            exclude: [
                /angular-i18n/,  // localizations are loaded dynamically
                'bower_components/bootstrap/' // Exclude Bootstrap LESS as we use bootstrap-sass
            ],

            ignorePath: /\/bower_components\// // remove /bower_components/ from paths of injected sass files
        }))
        .pipe(gulp.dest(config.scss)));
});

gulp.task('wiredep:test', function () {
    return gulp.src(config.test + 'karma.conf.js')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(wiredep({
            exclude: [
                /angular-i18n/,  // localizations are loaded dynamically
                /angular-scenario/,
                'bower_components/bootstrap-sass/assets/javascripts/' // Exclude Bootstrap js files as we use ui-bootstrap
            ],
            ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected JavaScript files
            devDependencies: true,
            fileTypes: {
                js: {
                    block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /'(.*\.js)'/gi
                    },
                    replace: {
                        js: '\'{{filePath}}\','
                    }
                }
            }}))
        .pipe(gulp.dest(config.test));
});

gulp.task('build', function (cb) {
    runSequence('clean', 'copy', 'wiredep:app', 'usemin', cb);
});

gulp.task('inject-js', function () {
    var source=gulp.src(config.app+'scripts/**/*.js').pipe(angularFilesort());
    var source1=gulp.src(config.app+'scripts/**/*.*.js').pipe(angularFilesort());
    return gulp.src('index.html')
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(inject(source, {addRootSlash: false}))
        .pipe(inject(source1, {addRootSlash: false}))
        .pipe(gulp.dest('.'));
});

gulp.task('usemin', ['images', 'styles','inject-js'], function () {
    return gulp.src([config.app + '**/*.html', '!' + config.app + '@(bower_components|node_modules|node|test)/**/*.html'])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(usemin({
            css: [
/*                prefix,
                'concat',
                cssnano,
                rev*/
            ],
            html: [
             /*   htmlmin.bind(htmlmin, {collapseWhitespace: true})*/
            ],
            js: [
               /* sourcemaps.init,
                ngAnnotate,
                'concat',
                uglify.bind(uglify, {mangle: false, compress:{drop_console : true}}),
                rev,
                sourcemaps.write.bind(sourcemaps.write, '.')*/
            ]
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('ngconstant:dev', function () {
    return ngConstant({
        dest: 'app.constants.js',
        name: 'srcApp',
        deps: false,
        noFile: true,
        interpolate: /\{%=(.+?)%\}/g,
        wrap: '/* jshint quotmark: false */\n"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
        // constants: {
        //     ENV: 'dev',
        //     VERSION: util.parseVersion()
        // }
    })
        .pipe(gulp.dest(config.app + 'scripts/'));
});

// gulp.task('ngconstant:prod', function () {
//     return ngConstant({
//         dest: 'app.constants.js',
//         name: 'srcApp',
//         deps: false,
//         noFile: true,
//         interpolate: /\{%=(.+?)%\}/g,
//         wrap: '/* jshint quotmark: false */\n"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}',
//         constants: {
//             ENV: 'prod',
//             VERSION: util.parseVersion()
//         }
//     })
//         .pipe(gulp.dest(config.app + 'scripts/'));
// });

gulp.task('jshint', function () {
    //Custom reporter (in task to have new instance each time)
    var jsHintErrorReporter = require('./gulp/jsHintErrorReporter');

    return gulp.src(['gulpfile.js', config.app + 'scripts/**/*.js'])
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(cache('jshint'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jsHintErrorReporter());
});

//casperjs testing
gulp.task('casper',function(){
    process.stdout.write('\n');
    process.stdout.write('\n');
    process.stdout.write('\n');
    process.stdout.write("##@@ Casper Testing @@## :" + '\n');
    gulp.src(config.casperPath)
        .pipe((casperJs()));
});

gulp.task('test',function(){
    runSequence('unit-testing','casper');
});


gulp.task('default', ['serve']);
