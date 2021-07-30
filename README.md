# Human Rights First: Blue Witness

You can find the deployed project at [Human Rights First - Blue Witness](https://a.humanrightsfirst.dev/).

## Most Recent Contributors

Feel free to reach out if you have any questions about the repo.

|[Jaison Alonso](https://github.com/abe-one)|[Francis Nguyen](https://github.com/francishtknguyen)|[Justin Peczenij](https://github.com/justinpeczenij)|||
| :-: | :-: | :-: | :-: | :-: |
|        [<img src="https://avatars.githubusercontent.com/u/77995299?v=4" width = "200" />](https://github.com/)         |             [<img src="https://avatars.githubusercontent.com/u/78515635?v=4" width = "200" />](https://github.com/)              |            [<img src="https://avatars.githubusercontent.com/u/78557316?v=4" width = "200" />](https://github.com/)             |
|                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/abe-one)                  |                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/francishtknguyen)                   |                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/justinpeczenij)                   |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/abeone) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/francishtknguyen) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/justinpeczenij) |

<br>

All [Labs Engineering Standards](https://labs.lambdaschool.com/topics/node-js/) must be followed.

## Project Overview

[Technical Architecture and Userflow Screenshot](https://files.slack.com/files-pri/TSZCHB482-F029B6UQXHC/hrf-police-ds_1.25x.png)

[Technical Architecture and Userflow Whimsical Board](https://whimsical.com/hrf-police-ds-W8Uq6mnxh5DAFZJ9wregft)

We are developing an interactive map that identifies reports of police use-of-force across the United States of America for Human Rights First, a not-for-profit independent advocacy and action organization.

### Key Features

- User can view reports of police brutality and obtain sources to do further research
- Users can interact with a map to help visualize where these reports occur
- Users can view a timeline of recent events to see how often these events are occurring
- Administrators have the ability to approve, reject, and CRUD incidents

### What to build next?

- Work with front end and data science to implement a way to get user responses into the database.
- There is currently no way for an admin to send a Tweet to get more information about an incident from a user.
- The idea we had was to give the admin the ability to create a tweet with the link to a pre-populated form that can either update the database with the needed information or store responses from the the users in a new table for the admin to look at when updating the incident. This will send the incident back to the admin dashboard as pending, where the incident can then be updated by the admin. This idea can be changed to whatever implementation you see fit.
- Further validation to increase security of the database against possible attacks.
- The heroku server is set up to deploy automatically upon updating `main`, however, this doesn't actually work. Maybe check it out. `Workaround is to deploy manually`

## Tech Stack

### Backend API built using:

- Node
- Express
- PostgresSQL
- Yup for validation
- Swagger/jsdoc
- Okta for authorization

## Endpoint Documentation

See our [Swagger Documentation](https://hrf-blue-witness-a.herokuapp.com/api-docs) for information about the endpoints of our server.

Or on your local deploy.

- https://localhost:8000/api-docs

Swagger docs are created using open api v3 notations. The docs are found inline
on the router files in `api/**/*Router.js` and use the yaml notation format.
The root of the docs is in `config/jsdoc.js` using the json format.

The following libraries have been used to build and serve the swagger docs live.

- [express-ui](https://github.com/scottie1984/swagger-ui-express)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## The backend server is connected to the data science database.

#### [Server endpoint](https://hrf-blue-witness-a.herokuapp.com/)

#### [Back End Repo](https://github.com/Lambda-School-Labs/human-rights-first-be-a/)

#### [Front End Repo](https://github.com/Lambda-School-Labs/human-rights-first-police-fe-a)

#### [Data Science Repo](https://github.com/Lambda-School-Labs/human-rights-first-police-ds-a)

# PostgreSQL Database

The backend is sharing a database with the Data Science Team. The Data Science team will be scraping data into the same database that the backend server pulls data from. The current migrations can be used for testing locally on a development environment as the table schemas should be identical (hopefully).

# Environment Variables

```
PORT=
BE_DATABASE_URL=
DS_DATABASE_URL=
OKTA_URL_ISSUER=
OKTA_CLIENT_ID=
LOCAL_DATABASE=
```

In order for the app to function correctly, the user must set up their own environment variables. You should receive an environment variables notion doc to help you get setup, or reach out to past contributors.

# Testing

Almost no testing has been implemented as of July 30, 2021. Only sanity tests.

# Installation Instructions

Run 'npm install' to install all necessary dependencies.

### Important Command

Run 'npm run server' to spin up a local development server on port 8000.

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

### Pull Request Guidelines

Please see [pull_request_template.md](/pull_request_template.md)

```
Description
Fixes # (issue)

Type of change
Please delete options that are not relevant.
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

Change Status
- [ ] Complete, tested, ready to review and merge
- [ ] Complete, but not tested (may need new tests)
- [ ] Incomplete/work-in-progress, PR is for discussion/feedback

How Has This Been Tested?
- [ ] Test A
- [ ] Test B

Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] My code has been reviewed by at least one peer
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] There are no merge conflicts

```

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Deprecated Code

### If a new database needs to be seeded, legacy incidents can be acquired via commit

```
#7efb8d6c90189023e25dc1e19239e83931778488
```

There is also a function to reformat the data.

### If you need the DS utils, including cron they can be restored from commit `

```
    #fee018b0b48bad3170f8b0641be22457c002d571
```

### If you need the profile migrations and functions in can be restored from commits:

```
    #92c6a439fb5d050e3bc0d51b1c2de20922ef19fe
    #415987c7a0b223960ee5e3e232d2878a32d6e82f
    #415987c7a0b223960ee5e3e232d2878a32d6e82f
```
