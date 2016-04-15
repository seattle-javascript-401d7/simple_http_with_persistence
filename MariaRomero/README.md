# simple_http_with_persistence

CF Javascript 401 assignment 4/15/16

This application creates a simple http server that acts as a simple data store. It should respond to GET/POST requests for a single resource of your choosing.

POST - The data coming in from a post request should be saved to a json file in a data folder in your repository, do not commit your data folder to git. For example if a request is sent to /notes with a body of {noteBody: 'hello world'} the json data in the body should be stored in it's own json file. You can pick a naming scheme for the file but I would recommend using the number of files that you have received so far.

GET - A get request sent to /notes should respond with a list of all of the json files that have been saved thus far.
