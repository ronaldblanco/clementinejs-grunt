var htmlbuildconfig = require('./app/grunt/htmlbuild.js');
var concatconfig = require('./app/grunt/concat.js');

module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    concat: concatconfig,

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          //'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/js/profile.<%= pkg.name %>.min.js': ['<%= concat.profile.dest %>'],
          'dist/js/user.<%= pkg.name %>.min.js': ['<%= concat.userlocal.dest %>'],
          'dist/js/index.<%= pkg.name %>.min.js': ['<%= concat.index.dest %>'],
          'server/functions.server.js': ['app/common/functions.server.js'],
          'server/express.js': ['express.js'],
          'server/router.js': ['app/routes/index.js']
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
    
    nodemon: {
			development: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: ['app/views/**/*.*'].concat(['gruntfile.js', 'server.js', 'express.js', 'app/**/*.js']),
					ignore: ['node_modules/**', 'log/**', 'public/**', 'dist/**']
				}
			},
			production: {
				script: 'server.js',
				options: {
					ext: 'js,html'
				}
			}
		},
		
		execute: {
        build: {
            src: ['build.js']
        },
        clean: {
            src: ['clean.js']
        }
    },
    
    csslint: {
			/*options: {
				csslintrc: '.csslintrc'
			},*/
			dist: {
				src: ['app/views/css/main.css'/*, 'app/views/css/*.css'*/],
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/main.min.css': 'app/views/css/main.css',
          'dist/css/w3.min.css': 'app/views/css/w3.css'
        }
      }
    },

    fixturesPath: "dist",
    htmlbuild: htmlbuildconfig,
    
    eslint: {
      options: {
            silent: true
        },
        src: ["app/**/*.js"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-execute');
  
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');
  
  // Test all task(s).
  grunt.registerTask('check-all', ['jshint', 'csslint', 'qunit', 'eslint']);
  
  // Test task(s).
  grunt.registerTask('check', ['jshint', 'csslint', 'eslint']);
  
  // Build-check task(s).
	grunt.registerTask('build-check', ['execute:build', 'check', 'concat', 'uglify', 'cssmin', 'htmlbuild', 'qunit']);
	
	// Build task(s).
	grunt.registerTask('build', ['execute:build', 'concat', 'uglify', 'cssmin', 'htmlbuild']);

  // Run dev task(s).
  grunt.registerTask('run-dev', ['nodemon:development']);
  
  // Run task(s).
  grunt.registerTask('run', ['nodemon:production']);
  
  // Clean task(s).
  grunt.registerTask('clean', ['execute:clean']);
  
  // Production task(s).
  grunt.registerTask('production', ['build', 'nodemon:production']);
  
  // Development task(s).
  grunt.registerTask('development', ['build-check', 'nodemon:development']);
  
  // Default task(s).
  grunt.registerTask('default', ['production']);

};