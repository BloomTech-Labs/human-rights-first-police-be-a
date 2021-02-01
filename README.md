# Human Rights First: Police Brutality Across America

You can find the deployed project at [Human Rights First - Police Brutality Across America](https://main.d17v0exvwwwzgz.amplifyapp.com/).

## Contributors

|                                                      [Mark Rivera](https://github.com/MarkRivera)                                                       |                                                       [Michael Rockingham](https://github.com/mrockingham)                                                        |                                                      [Jen Stewart](https://github.com/jstewart8053)                                                       |                                                       [Anthony Carrillo](https://github.com/anthony2698)                                                        |     |                                                 
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars3.githubusercontent.com/u/6520868?s=460&u=64f1fbd9fe4ee6c48f4a0a02147d1c606d443d59&v=4" width = "200" />](https://github.com/) | [<img src="https://ca.slack-edge.com/ESZCHB482-W012BRSM0CE-4185df18f7ee-512" width = "200" />](https://github.com/) | [<img src="https://ca.slack-edge.com/ESZCHB482-W016369SB7T-5bc27b0171fc-512" width = "200" />](https://github.com/) | [<img src="https://ca.slack-edge.com/ESZCHB482-W012JQ3D2AX-e0654ed5ac8d-512" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "0" />](https://github.com/) |
|                                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                                |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)                           |                           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah)                            |
|                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |

<br>
<br>


## Project Overview

[Trello Board](https://trello.com/b/QWXanExQ/team-c-2009)

[Technical Architecture and Userflow](https://whimsical.com/8sQcpjw3K2XdAiM9aeMkft)

Our team is developing an interactive map that identifies instances of police use of force across the United States of America for Human Rights First, an independent advocacy and action organization.

### Key Features

- User can view incidents of police brutality and get more information on specific incidents
- User can seearch map based on type of force, location, and date 

## 1️⃣ Tech Stack

### Data Science API built using:
- Pandas
- scikit-learn
- spacy
- nltk
- PRAW
- Tweepy

### Reasons for selection:

- Works well with FastAPI
- Recommended to us
- Wanted to learn an in-demand framework


#### Data Science API deployed to AWS

#### [Back end](https://humanrightsfirst-a-api.herokuapp.com/) built using:

#### [Back end Repo](https://github.com/Lambda-School-Labs/human-rights-first-be-a/)
### dependencies
    "@okta/jwt-verifier": "^1.0.0",
    "axios": "^0.19.2",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "dotenv": "^8.2.0",
    "express": "^4.16.4",
    "faker": "^4.1.0",
    "helmet": "^3.23.1",
    "http-errors": "~1.6.3",
    "json2csv": "^5.0.5",
    "knex": "^0.21.6",
    "luxon": "^1.25.0",
    "morgan": "~1.9.1",
    "node-cron": "^2.0.3",
    "pg": "^8.2.1",
    "swagger-jsdoc": "^4.0.0",
    "swagger-ui-express": "^4.1.4"

---
# APIs

## 2️⃣ Data Science API

We are sending json objects to the backend with information about instances of police use of force. This information includes location data (city, state, and geocode) and relevant details about the incident, like the type of force that was used.

## 2️⃣ PRAW

PRAW, The Python Reddit API Wrapper, makes it easy for users to analyze Reddit data. We used PRAW to scrape Reddit for potential instances of police of force.

## 3️⃣ Tweepy

Tweepy is a Python library that allows users to access the Twitter API. We used Tweepy to scan Twitter to find instances of police use of force.

# 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

OKTA_URL_ISSUER = https://auth.lambdalabs.dev/oauth2/default

OKTA_CLIENT_ID = 0oalwp37fU2aV9UEG4x6

DATABASE_URL = postgres://ugkakqld:oZSXjtaGFA1r1psfCfIfv1ZEJID1j4KM@raja.db.elephantsql.com:5432/ugkakqld?ssl=true

# Testing

No testing implemented as of January 31st, 2021. 

# Installation Instructions

Run 'npm install' to install all necessary dependencies. 

## Other Scripts

    * npm run server - must be executed from /server folder - runs local server for development 

    * npm run cleardb - must be executed from /server folder - deletes all records from Incidents table

    * npm run initialfetch - must be executed from /server folder - performs initial population of Incidents table

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/Labs27-C-HRF-FE) for details on the frontend of our project.
      

