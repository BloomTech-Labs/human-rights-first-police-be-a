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