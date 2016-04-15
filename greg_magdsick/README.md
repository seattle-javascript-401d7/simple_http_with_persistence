This project was created by Greg Magdsick for Code Fellows 401d7. This project creates a simple HTTP server that listens on port 7000 and accepts POST and GET requests to /notes

It takes the data from the POST request and writes it to a new JSON file in the /data directory.

In response to the GET request, the program gives you a list of the files in the /data directory.

##To run
From the command line, type node index.js

##To test
From the command line, type gulp. This runs the tests in /test/index_test.js and lints all files.
