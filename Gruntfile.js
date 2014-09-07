module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist']
        },
		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: ['vendor/jquery/dist/jquery.js',
					'vendor/angular/angular.js',
					'vendor/angular-ui-router/release/angular-ui-router.js',
					'vendor/bootstrap/dist/js/bootstrap.min.js',
					'src/js/**/*'
				],
				dest: 'dist/js/app.js'
			},
			css: {
				src: ['vendor/bootstrap/dist/css/bootstrap.css',
					'vendor/bootstrap/dist/css/bootstrap-theme.css',
					'src/css/app.css'
				],
				dest: 'dist/css/app.css'
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

	// load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'concat', 'copy', 'connect', 'open', 'watch']);

};