# simple_http_with_persistence

CF Javascript 401 assignment 4/15/16

This application creates a simple http server that acts as a simple data store. It respond to GET/POST requests at `/records`.

POST - The data coming in from a post request is saved to a json file in a data folder. Files are named numerically by how many files have been stored, for example 'jsonFile4.json'.

GET - A get request sent to `/records` responds with a list of all of the json files that have been saved so far.
