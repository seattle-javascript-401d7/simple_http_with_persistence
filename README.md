# simple_http_with_persistence


For this assignment, write an http server that will act as a simple data store. It should respond to GET/POST requests for a single resource of your choosing.

POST - The data coming in from a post request should be saved to a json file in a data folder in your repository, do not commit your data folder to git. For example if a request is sent to /notes with a body of {noteBody: 'hello world'} the json data in the body should be stored in it's own json file. You can pick a naming scheme for the file but I would recommend using the number of files that you have received so far.

GET - A get request sent to /notes should respond with a list of all of the json files that have been saved thus far.

Submit as a pull request to your own repository.

 

 

Rubric:

Handles REST requests: 3pts

JSON storage: 3pts 

Tests: 2pts

Project Organization and Development Files: 2pts
