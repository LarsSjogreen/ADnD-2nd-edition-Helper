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
      }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass']);
};
