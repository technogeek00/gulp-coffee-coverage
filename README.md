# gulp-coffee-coverage
A small module that wraps the coffee-coverage plugin to allow easy CoffeeScript coverage with gulp.js

## Installation
Not yet available on npm, coming soon.

## Usage
This can be used to apply coverage and compile any coffeescript files in the current task using the awesome
[coffee-coverage](https://github.com/benbria/coffee-coverage) plugin. Coverage is stored 
globally in `_$jscoverage` by default and this will typically work with most mocha reporters.

Here is a usage
example using [mocha-multi](https://github.com/glenjamin/mocha-multi) to output the html-cov to a file along
side the default spec being displayed by stdout.

```javascript
var coffeeCov = require('gulp-coffee-coverage')
var mocha     = require('gulp-mocha')

gulp.task('coverage', function() {
    // how mocha-multi takes args
    process.env['multi'] = "spec=- html-cov=coverage.html"
    return gulp.src("src/*.coffee")
        .pipe(coffeeCov())
        .pipe(mocha({
            reporter : "mocha-multi"
        })
})
```

## Options
Currently the only option supported is bare, which will compile the coffeescript files with the bare flag.

## License
WTFPL
