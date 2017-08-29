# gulp-surplus
A Gulp plugin for compiling [Surplus JSX](https://github.com/adamhaile/surplus) views.
## How to install
```sh
> npm install --save-dev gulp-surplus
```
```javascript
// gulpfile.js
var gulp = require('gulp'),
    surplus = require('gulp-surplus');
 
gulp.task('default', function () {
    return gulp.src('view.jsx')
        .pipe(surplus())
        .pipe(gulp.dest('dist'));
});
```