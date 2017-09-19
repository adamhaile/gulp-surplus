var gutil = require('gulp-util'),
	through = require('through2'),
	compiler = require('surplus/compiler');

module.exports = function (opts) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
		} else if (file.isStream()) {
			cb(new gutil.PluginError('gulp-surplus', 'Streaming not supported'));
		} else {
    		try {
    			var ret = compiler.compile(file.contents.toString(), opts);

    			if (ret) {
    				file.contents = new Buffer(ret);
    			}

    			this.push(file);
    		} catch (errs) {
    			this.emit('error', new gutil.PluginError('gulp-surplus', errs, {
    				fileName: file.path,
    				showStack: true
    			}));
    		}

    		cb();
        }
	});
};
