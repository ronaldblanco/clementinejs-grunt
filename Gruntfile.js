module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/common/ajax-functions.js','app/controllers/*.client.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
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
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: ['app/view/**/*.*'].concat(['gruntfile.js', 'server.js', 'app/**/*.js']),
					ignore: ['node_modules/**']
				}
			}
		},
    
    /*csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			dist: {
				src: ['app/view/css/*.css'],
				dest: 'dist/<%= pkg.name %>.css'
			}
		},*/
    
    
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/main.min.css': 'app/view/css/main.css',
          'dist/w3.min.css': 'app/view/css/w3.css'
        }
      }
    }
    
    
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');
  
  grunt.registerTask('test', [/*'jshint', 'qunit'*/]);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'cssmin', 'nodemon']);

};