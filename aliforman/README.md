#Simple HTTP with Persistence
1. POST - post requests are saved as .json files in data folder. The name file being used is the current date and time of the post request.

2. GET - get requests sent to the data folder are listed in '/greet/list' route.

##Instructions
- Type 'localhost:3000' will display 'Prepare to be assimilated earthlings.'
- Type 'localhost:3000/greet' will display 'Prepare to be assimilated earthlings.' as well.
- Type 'localhost:3000/greet/list' will display list of the post requests .json files in the data folder.

##Testing
- Type 'gulp' to run all tests.  It should pass three tests.
- gulp.watch - will test ('./test/**/*test.js', ['lint:test', 'mochaTest']) and (files, ['lint:nontest', 'mochaTest'])
- gulp.lint will test ['lint:test', 'lint:nontest'])
- gulp.mochaTest will test ['mocha:test'])
- gulp.default will test ['lint:test', 'lint:nontest', 'mocha:test'])
