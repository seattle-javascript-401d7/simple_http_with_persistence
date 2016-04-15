## SIMPLE HTTP SERVER WITH DATASTORE
* a simple datastore for slothbears

#### Functionality
* To launch the server run a ``` node index.js ```
* You can store data by sending json in a post request to the ``` /notes ``` directory (example: ``` localhost:3000/notes ```).
* You can retrieve a list of files stored by sending a get request to ``` /notes ```
* You can retrieve a file by sending a get request to either the file number (example: ``` localhost:3000/notes/0 ```) or the file name (example: ``` localhost:3000/notes/0.json ```).
