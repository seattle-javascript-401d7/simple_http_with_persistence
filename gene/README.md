# simple_http_with_persistence


This project is an http server that acts as a simple data store. It responds to GET/POST requests for a single resource.

* POST - The incoming data is saved to a json file in a data folder.

* GET - A get request sent to /notes responds with a list of all of the json files that have been saved thus far.

##To run:
  * Clone to your own repo
  * Open the Terminal, and install superagent-cli
  * Navigate to the lib directory
  * Type node server.js
  * Open another Terminal window and navigate to the root directory
  * On the command line, type superagent localhost:3000/notes post '{"name": "Salmons"}'
  * Repeat this command a few times to generate some files
  * Open a browser
  * Navigate to localhost:3000/notes to view the posted file names
