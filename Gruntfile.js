module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-exec');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            fixtures: {
                command: 'node fixtures/load.js',
                callback: function(err, stdout, stderr) {
                    grunt.log.ok();
                }
            }
        }
    });

    grunt.registerTask('default', ['exec:fixtures']);
};
