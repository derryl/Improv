
var server_port = 8799;

module.exports = function(grunt) {
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: server_port,
                    base: 'example',
                    hostname: '*'
                }
            }
        },
        
        clean: {
            build:   ['build'],
            example: ['example']
        },
        
        copy: {
            example: {
                src: [
                    'Improv.js',
                    'example/index.html',
                    'example/test_stylesheet.css'
                ],
                cwd: 'src/',
                dest: 'example',
                expand: true,
                flatten: true
            },
            src: {
                src: ['src/Improv.js'],
                dest: 'build',
                expand: true,
                flatten: true
            }
        },
        
        watch: {
            grunt: { 
                files: ['Gruntfile.js']
            },
            src: {
                files: ['src/**/*'],
                tasks: ['build']
            },
            build: {
                files: ['example/**/*'], 
                options: { livereload: true }
            }
        },
        
        less: {
            master: {
                files: {
                    'example/base.css': 'src/example/base.less'
                }
            }  
        },
        
        // Append additional vendor components
        concat: {
            // js_vendor: {
            //     src: [
            //         'build/scripts/vendor.js',
            //         'src/scripts/vendor/modernizr.custom.js',
            //         'src/scripts/vendor/classie.js',
            //         'src/scripts/vendor/uiMorphingButton_fixed.js'
            //     ],
            //     dest: 'build/scripts/vendor.js'
            // },
            // js_everything: {
            //     src: [
            //         'build/scripts/vendor.js',
            //         'build/scripts/morph.js',
            //         'build/scripts/main.js'
            //     ],
            //     dest: 'build/app.js'
            // }
        },
        
        uglify: {
            options: {
                mangle: true
            },
            build: {
                files: {
                    'build/Improv.min.js': ['src/Improv.js']
                }
            }
        },
        
        shell: {
            openBrowser: {
                command: 'open http://0.0.0.0:' + server_port
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');

    // grunt.registerTask('build', ['sass', 'includes', 'copy']);
    
    grunt.registerTask('build', [
        // 'clean:build',
        'clean',
        'copy',
        'less',
        'uglify',
    ]);
    
    grunt.registerTask('default', [
        'build',
        'connect',
        'shell:openBrowser',
        'watch'
    ]);
}