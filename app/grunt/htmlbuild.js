module.exports = {
        login: {
            src: 'app/views/template/base.html',
            dest: 'public/login.html',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                basePath: false,
                scripts: {
                    bundle: [
                        //'<%= fixturesPath %>/js/*.js',
                        //'<%= fixturesPath %>/*.js',
                        //'!**/main.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        '<%= fixturesPath %>/css/*.css'
                    ],
                    test: '<%= fixturesPath %>/css/inline.css'
                },
                sections: {
                    views: 'app/views/login.html',
                    //templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                        header: 'app/views/layout/head.html',
                        footer: 'app/views/layout/foot.html'
                    }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "login",
                },
            }
        },
        index: {
            src: 'app/views/template/base.html',
            dest: 'public/index.html',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                basePath: false,
                scripts: {
                    bundle: [
                        //'<%= fixturesPath %>/js/*.js',
                        //'<%= fixturesPath %>/*.js',
                        //'!**/main.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        '<%= fixturesPath %>/css/*.css'
                    ],
                    test: '<%= fixturesPath %>/css/inline.css'
                },
                sections: {
                    views: 'app/views/index.html',
                    //templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                        header: 'app/views/layout/head.html',
                        footer: 'app/views/layout/foot.html'
                    }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "index",
                },
            }
        },
        profile: {
            src: 'app/views/template/base.html',
            dest: 'public/profile.html',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                basePath: false,
                scripts: {
                    bundle: [
                        //'<%= fixturesPath %>/js/*.js',
                        //'<%= fixturesPath %>/*.js',
                        //'!**/main.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        '<%= fixturesPath %>/css/*.css'
                    ],
                    test: '<%= fixturesPath %>/css/inline.css'
                },
                sections: {
                    views: 'app/views/profile.html',
                    //templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                        header: 'app/views/layout/head.html',
                        footer: 'app/views/layout/foot.html'
                    }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "profile",
                },
            }
        },
        loginlocal: {
            src: 'app/views/template/base.html',
            dest: 'public/loginlocal.html',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                basePath: false,
                scripts: {
                    bundle: [
                        //'<%= fixturesPath %>/js/*.js',
                        //'<%= fixturesPath %>/*.js',
                        //'!**/main.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        '<%= fixturesPath %>/css/*.css'
                    ],
                    test: '<%= fixturesPath %>/css/inline.css'
                },
                sections: {
                    views: 'app/views/loginlocal.html',
                    //templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                        header: 'app/views/layout/head.html',
                        footer: 'app/views/layout/foot.html'
                    }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "loginlocal",
                },
            }
        },
        usercreationOK: {
            src: 'app/views/template/base.html',
            dest: 'public/usercreationOK.html',
            options: {
                beautify: true,
                prefix: '',
                relative: true,
                basePath: false,
                scripts: {
                    bundle: [
                        //'<%= fixturesPath %>/js/*.js',
                        //'<%= fixturesPath %>/*.js',
                        //'!**/main.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        '<%= fixturesPath %>/css/*.css'
                    ],
                    test: '<%= fixturesPath %>/css/inline.css'
                },
                sections: {
                    views: 'app/views/usercreationOK.html',
                    //templates: '<%= fixturesPath %>/templates/**/*.html',
                    layout: {
                        header: 'app/views/layout/head.html',
                        footer: 'app/views/layout/foot.html'
                    }
                },
                data: {
                    // Data to pass to templates
                    version: "0.1.0",
                    title: "usercreationOK",
                },
            }
        }
    };