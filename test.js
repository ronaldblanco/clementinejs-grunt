dev: {
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
                        'app/views/css/*.css'
                    ],
                    test: 'app/views/css/inline.css'
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
                        'app/common/ajax-functions.js',
                        'app/controllers/clickController.client.js',
                        'app/controllers/dataController.client.js',
                        'app/controllers/profileController.client.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        'app/views/css/*.css'
                    ],
                    test: 'app/views/css/inline.css'
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
                        'app/common/ajax-functions.js',
                        'app/controllers/profileController.client.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        'app/views/css/*.css'
                    ],
                    test: 'app/views/css/inline.css'
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
                        'app/common/ajax-functions.js',
                        'app/controllers/userController.client.js'
                    ],
                    main: '<%= fixturesPath %>/js/main.js'
                },
                styles: {
                    bundle: [
                        'app/views/css/*.css'
                    ],
                    test: 'app/views/css/inline.css'
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
                        'app/views/css/*.css'
                    ],
                    test: 'app/views/css/inline.css'
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
    },

css: {
        files: ['app/views/css/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['app/**/*.js'],
        tasks: ['concat', 'uglify']
      },
      html: {
        files: ['app/views/**/*.html'],
        tasks: ['htmlbuild']
      }
      
      options: {
      livereload: true,
      event: ['all']
      },
      
      files: ['<%= jshint.files %>', '<%= concat.files %>', '<%= cssmin.files %>', '<%= htmlbuild.files %>'],
      tasks: ['build']
var email 	= require("./node_modules/emailjs/email");
var server 	= email.server.connect({
   user:    "", 
   password:"", 
   host:    "",
   port: 25,
   ssl:     false
});

/*var server 	= email.server.connect({
   user:    process.env.EMAILUSER, 
   password:process.env.EMAILPASS, 
   host:    process.env.EMAILHOST,
   port: process.env.EMAILPORT,
   ssl:     false
});*/
 
// send the message and get a callback with an error or details of the message that was sent 
server.send({
   text:    "i hope this works", 
   from:    "you <>", 
   //to:      "someone <>, another <another@your-email.com>",
   to:      "someone <>",
   //cc:      "else <else@your-email.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });