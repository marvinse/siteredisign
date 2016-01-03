module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    bases: ["build/."],
                    livereload: true
                }
            }
        },
        sass: { 
            options: {
                noCache: true,
                sourcemap: 'none'
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'dev/components/',
                    src: ['**/*.scss'],
                    dest: 'dev/components/',
                    ext: '.css'
                }]
            }
        },
        'compile-handlebars':{
            globbedTemplateAndOutput:{
                template: 'dev/pages/*.hbs',
                partials: ['dev/partials/*.hbs','dev/components/*/*.hbs'],
                templateData: {},
                output: 'build/*.html'
            }
        },
        uglify: {
            options: {
                compress: true
            },
            js: {
                files: {
                    'build/js/main.min.js': ['dev/js/main.js'] 
                }
            }
        },
        concat: {
            js: {
                src: ['dev/js/vendor/*.js','dev/components/**/*.js'],
                dest: 'dev/js/main.js'
            },
            css: {
                src: ['dev/css/vendor/*.css','dev/components/**/*.css','!dev/components/global/*.css'],
                dest: 'dev/css/main.css'
            },
        },
        cssmin: {
            target: {
                files: {
                  'build/css/main.min.css': ['dev/css/main.css']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'dev/fonts/',
                src: '**',
                dest: 'build/fonts/',
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['dev/components/**/*.js'],
                tasks: ['concat','uglify']
            },
            sass: {
                files: ['dev/components/*/*.scss'],
                tasks: ['sass', 'concat', 'cssmin']
            },
            hbs: {
                files: ['dev/*/*.hbs','dev/*/*/*.hbs'],
                tasks: ['compile-handlebars']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat']);
    grunt.registerTask('server', ['express','copy','watch']);

};