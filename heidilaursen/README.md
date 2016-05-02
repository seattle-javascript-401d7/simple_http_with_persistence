### Http server with persistence

## Description
This will GET/POST to json files with a superagent command.

### How to Use
#### 1 run server with ```node index.js```

#### 2 open browser to localhost:3000/files

#### 3 In a second terminal post with a superagent command:
``` superagent localhost:3000/files post '{ "fileBody": "file message here"}'```

### Dependencies
  * fs
  * http

### DevDependencies
  * Chai
  * Chai-http
  * Gulp
  * Gulp-eslint
  * Gulp-Mocha
  * Mocha

### How to test
Run gulp in the command line. 
