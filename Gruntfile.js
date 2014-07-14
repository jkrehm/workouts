module.exports = function (grunt) {

    // Loads tasks based on package.json and
    // task configuration from grunt/*.json
    require('load-grunt-config')(grunt);

    grunt.registerTask('vendor:dist', function () {
        var fs = require('fs');
        var copy = grunt.config('copy.dist');

        // Build the list of vendor files in use and only copy those
        var file = fs.readFileSync('public/js/config.js', 'utf-8');
        var lines = file.trim().split("\n");

        copy.files = [];
        for (var i = lines.length - 1; i >= 0; i--) {
            var file = lines[i].match(/\/(vendor\/.*?)['"]/i);

            if (file) {
                copy.files.push({
                    src  : 'public/' + file[1] + '.js',
                    dest : 'dist/' + file[1] + '.js'
                });
            }
        }

        grunt.config('copy.dist', copy);
        grunt.task.run('copy:dist');
    });
};