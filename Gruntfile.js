module.exports = function(grunt) {
    grunt.initConfig({
      compass: {
        dist: {
          options: {
            sassDir: 'sass',
            cssDir: 'public/css',
            environment: 'production'
          }
        }
      },
      watch: {
        options: {
          dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          },
        },
        scripts: {
          files: ['sass/*.scss'],
          tasks: ['compass'],
          options: {
            livereload: {
              host: 'localhost',
              port: 3000,
            },
          },
        },
      },
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass']);
};
