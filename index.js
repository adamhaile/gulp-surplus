'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var htmlliterals = require('htmlliterals-preprocessor');

module.exports = function (opts) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
		} else if (file.isStream()) {
			cb(new gutil.PluginError('gulp-htmlliterals', 'Streaming not supported'));
		} else {
    		try {
    			var ret = htmlliterals.preprocess(file.contents.toString(), opts);

    			if (ret) {
    				file.contents = new Buffer(ret);
    			}

    			this.push(file);
    		} catch (errs) {
    			this.emit('error', new gutil.PluginError('gulp-htmlliterals', errs.join('\n'), {
    				fileName: file.path,
    				showStack: false
    			}));
    		}

    		cb();
        }
	});
};
