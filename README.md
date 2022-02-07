## Steps to run
1. Create a .env file
2. Add the following properties
```
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
TWITTER_WEBHOOK_ENV=
```
To generate these keys, you have to apply for Twitter Developers account and then create a new application in the [Developer Portal Dashboard](https://developer.twitter.com/en/portal/dashboard).

3. Run ```npm install``` and ```node index.js```

## WIP
1. Yet to add media_id to the reply tweet
2. Extract tweetId from the tweet sent by a user (Twitter automatically shortens the URL)
