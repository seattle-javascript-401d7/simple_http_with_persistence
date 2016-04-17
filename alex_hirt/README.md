#Simple Server with Persistence

This repo contains a server with routes that GET and POST to the endpoint:

`/rumothoughts`.

*(There are also **routes for an endpoint:*** `/rumothoughts/pretty`.  *This is an easter egg of sorts and just returns the contents in each .json file in a pretty human readable form.  This is not part of the Code Fellows assignment requirements but **just for  fun**). Cause ya know its like fun to have fun will learning too.*

## To see it work

1. Clone the repo.
2. `npm install`
3. `mkdir data master`
4. `node server.js`

Now you have two options to the see the functionality of this stuff:

*Please Note:  This only has routes for* `/`, `/rumothoughts`, *and* `/rumothoughts/pretty`.  *All other paths will result in a 404 page being displayed.*

1. Open your favorite browser and browse to the mentioned endpoints.  This will only work to see GET request responses.

2. If your savvy enough to have [superagent-cli] installed then you can run:
	- GET:

		`superagent localhost:5000`
		`superagent localhost:5000/rumothoughts',`
		`superagent localhost:5000/rumothoughts/pretty'`

	- POST:

		`superagent localhost:5000/rumothoughts post  '{"thought":"silver thread is Rala"}'`
		You MUST post data using proper JSON syntax used in this example so:

			`'{"thought":"silver thread is Rala"}' `

		Otherwise your route will fail and you will get an error.  

While checking the GET routes first will not result in any error you probably will not see anything (other than an empty object) until you have run a POST route.  So you should probably do that first.  

##How it works

###POST

The data coming in from a POST request to `/rumothoughts` is saved to a separate json file in the `/data` folder of your repo.  These will be saved as this `thought1.json`.   The number in the file reflect the order you send your post requests.  

###GET

A GET request sent to `/rumothoughts` responds with a json file that lists all of the thoughts posted to `data/`.  This file is `allThoughts.json` and is located in `/master`.  This is a single JSON object that is compiled from all the of the .json files in `/data`.  

###Testing

If you feel so inclined to test this stuff you can do this in one of two ways:

1. From the root of the repo run: `mocha`
2. Alternatively you can run: `gulp mocha`
