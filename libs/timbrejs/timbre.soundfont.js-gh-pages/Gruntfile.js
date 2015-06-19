'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				src: ['timbre.soundfont.js']
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			dist: {
				files: {
					'timbre.soundfont.min.js': ['timbre.soundfont.js']
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify']);

};
