module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/common/ajax-functions.js','app/controllers/*.client.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      profile: {
        src: ['app/common/ajax-functions.js','app/controllers/profileController.client.js'],
        dest: 'dist/js/profile.<%= pkg.name %>.js'
      },
      userlocal: {
        src: ['app/common/ajax-functions.js','app/controllers/userController.client.js'],
        dest: 'dist/js/user.<%= pkg.name %>.js'
      },
      index: {
        src: ['app/common/ajax-functions.js','app/controllers/clickController.client.js','app/controllers/dataController.client.js','app/controllers/profileController.client.js'],
        dest: 'dist/js/index.<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/js/profile.<%= pkg.name %>.min.js': ['<%= concat.profile.dest %>'],
          'dist/js/user.<%= pkg.name %>.min.js': ['<%= concat.userlocal.dest %>'],
          'dist/js/index.<%= pkg.name %>.min.js': ['<%= concat.index.dest %>']
        }
      }
    },
    
    qunit: {
      files: ['public/*.html']
    },
    
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        // options here to override JSHint defaults
        reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
    
    nodemon: {
			development: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: ['public/**/*.*'].concat(['gruntfile.js', 'server.js', 'app/**/*.js']),
					ignore: ['node_modules/**','log/**']
				}
			},
			production: {
				script: 'server.js',
				options: {
					//nodeArgs: ['--debug'],
					ext: 'js,html'//,
					//watch: ['public/**/*.*'].concat(['gruntfile.js', 'server.js', 'app/**/*.js']),
					//ignore: ['node_modules/**','test/**','log/**','dist/**']
				}
			}
		},
    
    csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			dist: {
				src: ['public/css/*.css'],
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/main.min.css': 'public/css/main.css',
          'dist/css/w3.min.css': 'public/css/w3.css'
        }
      }
    },

    fixturesPath: "dist",
    htmlbuild: {
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html-build');
  
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');
  
  // Test all task(s).
  grunt.registerTask('check-all', ['jshint', 'qunit']);
  
  // Test task(s).
  grunt.registerTask('check', ['jshint']);
  
  // Build task(s).
	grunt.registerTask('build', ['check','concat', 'uglify', 'cssmin', 'htmlbuild', 'qunit']);

  // Default task(s).
  grunt.registerTask('default', ['build', 'nodemon:development']);
  
  // Production task(s).
  grunt.registerTask('production', ['build', 'nodemon:production']);
  
  // Development task(s).
  grunt.registerTask('development', ['check-all', 'build', 'nodemon:development']);

};