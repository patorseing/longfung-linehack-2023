# longfung-linehack-2023

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

## set up .env

```sh
  firebase functions:config:set line.channel_access_token="xxxxx" line.channel_secret="xxxxx" dialogflow.agent_id="xxxxx"

  # and check by

  firebase functions:config:get > functions/.runtimeconfig.json
```
