module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: ['vendor/jquery/jquery-2.1.1.min.js',
					'vendor/angular/angular.min.js',
					'vendor/angular/angular-ui-router.min.js',
					'vendor/bootstrap/js/bootstrap.min.js',
					'src/js/**/*'
				],
				dest: 'dist/js/lifeWin.js'
			},
			css: {
				src: ['vendor/bootstrap/css/bootstrap.min.css',
					'vendor/bootstrap/css/bootstrap-theme.min.css',
					'src/css/app.css'
				],
				dest: 'dist/css/lifeWin.css'
			}
		},
		copy: {
			html: {
				files: [
					{expand: true, cwd: 'src/', src: ['index.html', 'view/**'], dest: 'dist/'},
					{expand: true, cwd: 'src/views', src: ['**'], dest: 'dist/views'}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 80,
					hostname: 'localhost',
					base: 'dist/',
					livereload: true,
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(function(req,res,next) {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.setHeader('Access-Control-Allow-Methods', '*');
                            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                            next();
                        });

                        return middlewares;
                    }
				}
			}
		},
		open: {
			home: {
				path: 'http://localhost'
			}
		},
		watch: {
			source: {
				files: ['src/**'],
				tasks: [
					'default'
				],
				options: {
					spawn: false
				}
			},
			liveReload: {
				files: ['dist/**'],
				options: {
					livereload: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'copy', 'connect', 'open', 'watch']);

};