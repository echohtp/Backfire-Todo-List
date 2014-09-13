module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint:{
			files: ['gruntfile.js', 'js/*.js', 'server.js'],
			options:{
				globals:{
					jQuery: true,
					curly: true,
					console: true,
					devel: true,
					eqeqeq: true,
					eqnull: true,
					expr: true,
					latedef: true,
					node: true,
					module: true,
					undef: true,
					unused: true
				}
			}
		},
		uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      },
	      dist: {
	        files: {
	        	'dist/<%= pkg.name %>.min.js': ['js/*.js']
	        }
	      }
	    },
		watch:{
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint' ,'watch']);
};