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
- place it in the folder `frontend`
- run it `npm i && npm run dev`

## CI/CD

### Open PR

Step:

1. checkout code
~~2. add label `UI`, deploy hosting to preview~~
~~3. add label `BE`, if you want to deploy functions and others~~
2. add `UI:` at the beginning of the title of the PR, deploy hosting to preview~~
3. add `BE:` at the beginning of the title of the PR, if you want to deploy functions and others

### Merge to main

Step:

1. checkout code
2. deploy hosting to live

## Database Design

### Entity Relationship Diagram

[![erd](https://mermaid.ink/img/pako:eNq1VU2P2jAQ_SuRz-yhPeaWBauKtIQVZCu1QoqGeAALx876Y1cI-O91koWSxhGn-hJr5s2H3zzHJ1IqhiQmqGccdhqqtYz8ek6yWXTq9s0yVnO5iyRUODDyCnZYOC3-ejZKicgouSs0vjs01uMGcQxNqXltuZIDX61VpSyyok3y7YH_e-e_dJ_VYpomL8WcztIkcIYtlOj7O_Q7vp5lFzRbfrBdRBT1a-VLmszT7EegENS1wKJyhpfBpKZWlm-PQd9ROes2d9H_1F36kvkio4Gygksfh0Kxu9RfYa_JrznN8kDUu26EEJgilJZ_YC_LS5rR4pkm00UWyLQHzT5BY8HZcGxgTFOnl67V2vn89KTO_dnFPpcJYG6cjwBu5Iz4rywE3afe8eKGzoMpPrndd0j6M0xg8GowsEOjsaCt5QE4Sta3S1dtUEfwAYLDRjR6R7BDv79_glfcQv8ydQMUpdor8f-u7VUVi2mSp0FJBLmpoB7osyP3gRZ6oFtVPylVerqHoEcTbb1vr4G-H04qGuv-dMsa-4NKz_SIzlqEKffAnB9vB3pb0WWgG2dQp6xXMc1yuqSrnN5-1qFW7lB3NLZVRhBkQirUFXDmn4Y285rYPXoiSOy3DPRhTdby4nHgrFodZUliqx1OiKsb0X89JiTegjDeioxbpefdW9M-ORNSg_yt1BVz-QM75_3X?type=png)](https://mermaid.live/edit#pako:eNq1VU2P2jAQ_SuRz-yhPeaWBauKtIQVZCu1QoqGeAALx876Y1cI-O91koWSxhGn-hJr5s2H3zzHJ1IqhiQmqGccdhqqtYz8ek6yWXTq9s0yVnO5iyRUODDyCnZYOC3-ejZKicgouSs0vjs01uMGcQxNqXltuZIDX61VpSyyok3y7YH_e-e_dJ_VYpomL8WcztIkcIYtlOj7O_Q7vp5lFzRbfrBdRBT1a-VLmszT7EegENS1wKJyhpfBpKZWlm-PQd9ROes2d9H_1F36kvkio4Gygksfh0Kxu9RfYa_JrznN8kDUu26EEJgilJZ_YC_LS5rR4pkm00UWyLQHzT5BY8HZcGxgTFOnl67V2vn89KTO_dnFPpcJYG6cjwBu5Iz4rywE3afe8eKGzoMpPrndd0j6M0xg8GowsEOjsaCt5QE4Sta3S1dtUEfwAYLDRjR6R7BDv79_glfcQv8ydQMUpdor8f-u7VUVi2mSp0FJBLmpoB7osyP3gRZ6oFtVPylVerqHoEcTbb1vr4G-H04qGuv-dMsa-4NKz_SIzlqEKffAnB9vB3pb0WWgG2dQp6xXMc1yuqSrnN5-1qFW7lB3NLZVRhBkQirUFXDmn4Y285rYPXoiSOy3DPRhTdby4nHgrFodZUliqx1OiKsb0X89JiTegjDeioxbpefdW9M-ORNSg_yt1BVz-QM75_3X)

### Documentation Database

``` typescript
// key = name (Ly !== ly !== ลี่) no sensitive
type Band = Record<srting, {
  name: string
  image_url: string
  promoted_song_1?: string
  promoted_song_2?: string
  song_requested?: boolean
  description?: string
  social_media: {
    facebook_url?: string
    instargram_url?: string
    tiktok_url?: string
    website?: string
  }
  streaming: {
    apple_music_url?: string
    spotify_url?: string
    youtube_music_url?: string
  }
  ringtone: {
    line_melody_url?: string
  }
  payment: {
    qrcode_url?: string
    active?: boolean
  }
  line_beacon: Array<{
    hardware_id: string
    passcode: string
  }>
  updated_by: string // Line UserId
}>

// key = name
type Event = Record<srting, {
  name: string
  date: string // DD-MM-YYYY
  start_time: string // hh:mm
  end_time: string // hh:mm
  available_seats: number
  age_limitation: number
  alcohol_free?: boolean
  song_requested?: boolean
  description?: string
  poster_url?: string
  ticket_type: {
    free: boolean
    price?: number
  }
  social_media: {
    facebook_url?: string
    instargram_url?: string
    tiktok_url?: string
    website?: string
  }
  location: {
    address: string
    gmap_url?: string
  }
  line_beacon: Array<{
    hardware_id: string
    passcode: string
  }>
  line_up: Array<{
    start_time: string // hh:mm
    end_time: string // hh:mm
    band_name: string
  }>
  interested_person: Array<string> // line userid of audiance
  updated_by: string // Line UserID
}>

// key of LineBeacon is hardware_id
type LineBeacon = Record<srting, {
  event?: string // key of Event
  band?: string // key of Band
}>

// auto genarate key
type SongRequest = Record<string,  {
  song_name: string
  note?: string
  requested_by?: string // Line userid
  band_name?: string
  requested_at?: timestamp
}>

// auto genarate key
type Flex = Record<string, {
  user_id: string // Line userid
  band_name: string // Band name
  timestamp: timestamp
}>
```
