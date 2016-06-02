#Basic HTTP Server with Persistence Assignment Code Fellows 401

##User Instructions

##View file list in the browser

From the terminal navigate to the root project folder.

Enter 'node server.js' at the command line.

Open a browser window and enter:

###localhost:3000/list
this should return a list of files in the data folder

##POST a JSON file

From the terminal navigate to the root project folder.

Enter 'node server.js' at the command line.

Open a second terminal window and enter
'curl -X POST -d '[some JSON string]' localhost:3000/'
This should add a new file to the data folder.

##Gulp Testing

navigate to the root project folder and enter at the command line:

###gulp
to launch mocha testing, linter testing and gulp watch

###gulp lint
for linter only

###gulp mochaTest
for mocha test only

###gulp watch
to monitor file changes
