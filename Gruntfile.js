module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copyconfig: {
            'database': 'db'
        }
    });


    grunt.registerTask('copyconfig', 'Building configuration from dist', function() {
        grunt.log.writeln('Application version: ' + grunt.config('pkg.version')).ok();
    });

    grunt.registerTask('builddb', 'Building database from dump', function() {
    });

    grunt.registerTask('default', ['copyconfig', 'builddb']);
};
