For LABS_39 Backend Team From Labs_38:

** Quick Tip: Best way to understand the code is honestly to jump in, open a branch, and start trying to fix something minor or make something minor with another programmer and
Backend **

## ENV

-Backend is already setup to utilize the DS Database URL for production, which is the Database both DS and Web Backend share. For development, the local database URL needs to be changed to the postgres URL you get from elephantSQL. You'll find the instructions for setting up in the INSTALLATION INSTRUCTIONS FILE

-You can find the most updated environment variables with the credentials section of the product resources pinned at the top of our channel

## FLOW OF STATE/DATA

-Web backend and Data Science both share the same Postgres Database, but the script in the package.json that runs when triggered by heroku for production ensures that our local migration/seed aren’t utilized and that instead, the ones in the DS repository are utilized, but keep in mind, our modeling and routing and overlying APIs affect the DS repo, then affect the production database. So changes you make to modeling and routing files will affect how data is retrieved and returned both in the local database and the production database.

##APIs / AUTHENTICATION

-there are 2 APIs, one you can hit without a JSON web token, one you need the json web token for:

So the incidents API access through /incidents up top does not require a JSON web token, and is primarily used for HTTP requests via axios outside of the Admin Dashboard. The AdminIncidents API accessed through /dashboard/incidents is what’s used for the data you’ll see in the Admin Dashboard, this one does require the JSON web token, which you can grab by logging into admin dashboard on the deployed frontend or your local frontend, opening dev tools => application => local storage => okta-token-storage => idToken.

**_SEE LINK FOR IMAGES THAT WERE SUPPOSED TO APPEAR HERE: https://docs.google.com/document/d/137VYf-BzeZPCFIcfosH2nUiz-NpS7W219uFJbFggCVA/edit?usp=sharing _**

You would only need to grab that token if you want to pass it into the authentication header => bearer token in-case you want to test endpoints:

**_SEE LINK FOR IMAGES THAT WERE SUPPOSED TO APPEAR HERE: https://docs.google.com/document/d/137VYf-BzeZPCFIcfosH2nUiz-NpS7W219uFJbFggCVA/edit?usp=sharing _**

Otherwise, this process is built into the code, via the authRequired middleware applied to the Admin Incidents API that’s accessed through /dashboard/incidents:

**_SEE LINK FOR IMAGES THAT WERE SUPPOSED TO APPEAR HERE: https://docs.google.com/document/d/137VYf-BzeZPCFIcfosH2nUiz-NpS7W219uFJbFggCVA/edit?usp=sharing _**

FYI the Bearer matching is occurring here to take out the “bearer” string that gets passed in through the frontend oktaAxios helper function. We then turn it into idToken by accessing just the token portion of the string, which gets added to the match array at index 1. Index 0 in that array is a string with the value “Bearer”. That then gets passed into the OktaJWTVerifier for validation that the user accessing this endpoint has authorization for that data.

## WHAT NEEDS WORK ON WEB BACKEND

I think there may be a HTTP / HTTPS conundrum, sometimes an error gets thrown in the admin dashboard that indicates we need to change endpoints we make axios requests to on the frontend to HTTPS from HTTP. Now this may be a frontend only issue, or a frontend - AWS (ask Paul/Ryan for keys) issue, but I think Backend should be roped in.

I know the flow of data from the shared production database between Web Backend and DS is confusing, but perhaps the flow of that data can be clarified in some better way for future teams. We’ve done what we can to communicate it in meeting recordings and docs like this, but perhaps it can be researched more, turned into a google doc / notion / or whimsical mockup, and optimized in code.

For LABS_38 Backend Team From LABS_37:

There was a lot of confusion at the beginning of our labs month as to what was going on with the actual tables of this database.

Firstly, there is one database and it is being created by code inside the data science repo for this project. The code inside of this backend repo interacts with their 'force_ranks' table and their 'conversations' table at the DS_DATABASE_URL link found in the config variables where this repo is hosted on Heroku.

If you look inside this same Heroku, you will find multiple tables from past cohorts from a time when the database was held on the WEB Backend side of things. These tables are completely unused as of LABS_36. They did an overhaul and shifted all the data to the DS repo's host.

There is some wonky documentation throughout the project that we were unable to get through, Labs moves quicker than you think.
That could use fixing.

We broke our own unit tests as the month went on as we were making changes for the DS and FE teams.
That could use fixing.

As far as bigger objectives go, our team had discussed the idea of creating a new table on Web backend's heroku.
The purpose of this table would be to search through the force_ranks table and copy over any new approved incidents.
The idea here is that you would use this new table to populate the front page of the website, so that as the dataset gets
larger and larger, you wont have to search through this giant dataset just to load the front page, you'd already have a pre-
slimmed down version of the data.

Another way of accomplishing a similar idea would be to have the map and the timeline on the front page only populate the last 2-3(?) months of data so that you don't end up with a map that is overpopulated and unreadable. Then you could add functionality to allow a user to pick what time period they want to see the map from.

Good luck!
