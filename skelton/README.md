#Simple HTTP Server with Persistence (SHTTPSWP)

## SHTTPSWP uses GET/POST routes and acts as a basic data store.

##USE
From terminal:
* NPM install
* mkdir data
* node index

From browser:
* URL is localhost:3030/awesomeUrl
* A list of files in /data will be displayed

For Postman:
* Use the above URL
* Under "Headers" the key is 'Content-Type' and the value is 'application/json'
* Under "Body" select "raw" and enter your JSON data

For File Directory:
* Files are stored in /data
* each file will be given its own unique ID
