# HTTP Server with persistence

##Description
This has a get and post request on /notes

##How to Use:
node index.js
visit url http://localhost:3000/notes or curl http://localhost:3000/notes
npm i --save-dev superagent-cli
superagent localhost:3000/notes post '{"noteBody":"this is some body content"}'

##Dev-Dependencies
* "chai"
* "chai-http"
* "gulp"
* "gulp-eslint"
* "gulp-mocha"
* "mocha"

##Dependencies
* "fs"
* "http"

##How to Test
Run gulp in the Command Line. Make sure no open instances of the server are going.
