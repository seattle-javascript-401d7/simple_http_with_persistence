# Persistent HTTP Server Assignment

After cloning the repo and running `npm install`, please create two `/data` directories: one in the project root, the other in the `/test` directory. Run the server with `node index` or `npm start`. A POST request with any valid JSON string can be made to `localhost:3000/notes`, which will create a new file in `/data` containing the posted JSON. A GET request to `localhost:3000/notes` will return a list of all JSON files in `/data`. Tests can be run with `gulp test` or `npm test`, which will create new JSON files in `/test/data`. 
