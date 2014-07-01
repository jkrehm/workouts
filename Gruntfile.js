module.exports = function (grunt) {

    grunt.initConfig({

        // Copy files
        copy: {
            cssAsScss: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/vendor',
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: 'public/vendor',
                        filter: 'isFile',
                        ext: ".scss"
                    }
                ]
            }
        },

        // Compile SASS
        sass: {
            options: {
                precision: 10,
                unixNewlines: true,
            },
            dev: {
                options: {
                    lineNumbers: true,
                    style: 'expanded',
                },
                files: [{
                    expand: true,
                    cwd: 'public/css/sass',
                    src: '**/*.scss',
                    dest: 'public/css',
                    ext: '.css',
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/css/sass',
                    src: '**/*.scss',
                    dest: 'public/css',
                    ext: '.css',
                }]
            },
        },

        // Minify Javascript
        uglify: {
            options: {
                mangle: false,
                preserveComments: 'some',
            },
            dev: {
                files: [
                    {'public/vendor/requirejs/require.min.js'          : ['public/vendor/requirejs/require.js']},
                    {'public/vendor/requirejs-plugins/src/json.min.js' : ['public/vendor/requirejs-plugins/src/json.js']},
                    {'public/vendor/requirejs-plugins/lib/text.min.js' : ['public/vendor/requirejs-plugins/lib/text.js']},
                ],
            },
            dist: {
                files: [
                    {'public/vendor/requirejs/require.min.js' : ['public/vendor/requirejs/require.js']},
                ],
            }
        },

        // Watch for file changes
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['public/css/sass/**/*.scss'],
                tasks: ['sass:dev']
            },
            livereload: {
                options: {livereload: true},
                files: [
                    'public/**/*.html',
                    'public/css/**/*.css',
                    'public/js/**/*.js',
                    'public/js/**/*.json',
                ]
            }
        }
    });

    // Loaded modules
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-notify');

    // Defined tasks
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('bower', [
        'copy:cssAsScss',
        'uglify:dev',
        'sass:dev',
    ]);
};