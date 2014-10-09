
var server_port = 8799;

module.exports = function(grunt) {
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: server_port,
                    base: 'dist',
                    hostname: '*'
                }
            }
        },
        
        clean: {
            dist: ['dist']
        },
        
        copy: {
            src: {
                src: ['**/*'],
                cwd: 'src/',
                dest: 'dist',
                expand: true
            },
            examples: {
                src: ['example/index.html','example/test_stylesheet.css'],
                dest: 'dist',
                expand: true,
                flatten: true
            }
        },
        
        watch: {
            grunt: { 
                files: ['Gruntfile.js']
            },
            src: {
                files: ['src/**/*','example/**/*'],
                tasks: ['build']
            },
            dist: {
                files: ['dist/**/*'], 
                options: { livereload: true }
            }
        },
        
        less: {
            master: {
                files: {
                    'dist/example.css': 'example/example.less'
                }
            }  
        },
        
        // Append additional vendor components
        concat: {
            // js_vendor: {
            //     src: [
            //         'dist/scripts/vendor.js',
            //         'src/scripts/vendor/modernizr.custom.js',
            //         'src/scripts/vendor/classie.js',
            //         'src/scripts/vendor/uiMorphingButton_fixed.js'
            //     ],
            //     dest: 'dist/scripts/vendor.js'
            // },
            // js_everything: {
            //     src: [
            //         'dist/scripts/vendor.js',
            //         'dist/scripts/morph.js',
            //         'dist/scripts/main.js'
            //     ],
            //     dest: 'dist/app.js'
            // }
        },
        
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
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
        // 'clean:dist',
        'clean',
        'copy',
        'less'
        // 'uglify',
    ]);
    
    grunt.registerTask('default', [
        'build',
        'connect',
        'shell:openBrowser',
        'watch'
    ]);
}