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
    htmlbuild: htmlbuildconfig

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
  grunt.registerTask('check-all', ['jshint', 'csslint', 'qunit']);
  
  // Test task(s).
  grunt.registerTask('check', ['jshint', 'csslint']);
  
  // Build task(s).
	grunt.registerTask('build', ['check', 'concat', 'uglify', 'cssmin', 'htmlbuild', 'qunit']);
	
	// Build task(s).
	//grunt.registerTask('builddev', ['check', 'concat', 'uglify', 'cssmin', 'htmlbuild', 'qunit']);

  // Default task(s).
  grunt.registerTask('default', ['build', 'nodemon:development']);
  
  // Default task(s).
  grunt.registerTask('run', ['nodemon:development']);
  
  // Production task(s).
  grunt.registerTask('production', ['build', 'nodemon:production']);
  
  // Development task(s).
  grunt.registerTask('development', ['build', 'nodemon:development']);

};