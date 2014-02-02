module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    });

    grunt.registerTask('build-db', 'Building database from dump', function() {
        grunt.log.writeln('Building database schema...');
    });

    grunt.registerTask('fixtures', 'Run fixtures', function() {
        grunt.log.writeln('Executing fixtures...');
    });

    grunt.registerTask('default', ['build-db', 'fixtures']);
};
