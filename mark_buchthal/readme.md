# simple_http_with_persistence

This assignment writes an http server that acts as a simple data store.  It responds to GET/POST request for quotes.

POST -  accepts post request to /quotes.
The data coming in from a post request is saved to a json file in the db folder. For example if a request is sent to /notes with a body of {'quote': '<value>', 'person': '<speaker>'} the json data will be stored in it's own json file. The files are named by the number of quotes received -- 'file_#'

GET - A get request sent to /quotes should respond with a list of all of the json files that have been saved thus far.


