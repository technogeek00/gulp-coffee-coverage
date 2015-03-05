var through  = require('through2')
var coverage = require('coffee-coverage')
var gutil    = require('gulp-util')

var PLUGIN_NAME = "gulp-coffee-coverage"

module.exports = function(options) {
    if(!options) {
        options = {};
    }

    var instrumenter = new coverage.CoverageInstrumentor();

    // set global jscoverage object so files can be used 
    // in the current stream if needed
    global._$jscoverage = {}

    // file processing function
    var coverFile = function(file, enc, cb) {
        if(file.isNull()) {
            return cb(null, file);
        }

        if(file.isStream()) {
            return cb(new gutil.PluginError(PLUGIN_NAME, "Streams are not supported"));
        }

        if(file.isBuffer()) {
            var fileContents = file.contents.toString(enc);
            var fileName = file.path.charAt(0) + file.path;
            var covered = instrumenter.instrumentCoffee(fileName, fileContents, {
                bare : options.bare,
                path : 'relative'
            });
            file.contents = new Buffer(covered.init + covered.js, enc);
            file.path = gutil.replaceExtension(file.path, '.js');
        }

        return cb(null, file);
    }

    // create handle for processing
    return through.obj(coverFile)
}