# longfung-linehack-2023

NOTE: WARNING THIS PROJECT USES LINT

and already set GitHub action

## setting

- Line Messaging API
- Line Beacon
- Line Auth
- DialogFlow (account: nthcompetitionq12023@gmail.com (create a new email to get 300$))
- setting GCP billing
- setting Firebase
- create repo
- set NextJS
- firebase init
- set up Github action
- set up liff
- set up DialogFlow with firebase cloud function

## set up .env (example)

```sh
  firebase functions:config:set line.channel_access_token="xxxxx" line.channel_secret="xxxxx" dialogflow.agent_id="xxxxx"

  # and check by

  firebase functions:config:get > functions/.runtimeconfig.json
```

## How to run the full stack on local

```sh
  firebase emulators:start
```

***including:***

- Authentication
- Functions
- Firestore
- Hosting
- Pub/Sub
- Storage

## How to run BE

```sh
  firebase functions:config:set line.channel_access_token="xxxxx" line.channel_secret="xxxxx" dialogflow.agent_id="xxxxx"

  # and check by

  firebase functions:config:get > functions/.runtimeconfig.json

  cd functions

  npm run serve
```

## env for FE

- download file .env from --> [link](https://drive.google.com/file/d/1mkhZj3z7S-pt7WYWJ_7OxTCNEg9-phGO/view?usp=share_link)
- place it in folder `frontend`
- run it `npm i && npm run dev`

## CI/CD

### Open PR

Step:

1. checkout code
2. add label `UI`, deploy hosting to preview
3. add label `BE`, if you want to deploy functions and others

### Merge to main

Step:

1. checkout code
2. deploy hosting to live
