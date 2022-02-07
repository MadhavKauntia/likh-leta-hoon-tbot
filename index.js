const { Autohook } = require("twitter-autohook");
const dotenv = require("dotenv");
const client = require("twitter-api-client");
dotenv.config();

const twitterClient = new client.TwitterClient({
  apiKey: process.env.TWITTER_CONSUMER_KEY,
  apiSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

(async (start) => {
  try {
    const webhook = new Autohook();

    webhook.on("event", async (event) => {
      try {
        if (event.direct_message_events) {
          directMessages = event.direct_message_events;
          const id = directMessages[0].id;
          const message = await twitterClient.directMessages.eventsShow({
            id: id,
          });

          const tweetId = message.event.message_create.message_data.text; // assuming that user will send tweet ID directly, might optimize for tweet url later on

          twitterClient.tweets
            .statusesUpdate({
              status: "Likh leta hu UPSC mai na aa jaye", // tweet content
              in_reply_to_status_id: tweetId, // tweet id goes here
              // add media here
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {}
    });

    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Starts a server and adds a new webhook
    await webhook.start();

    // Subscribes to your own user's activity
    await webhook.subscribe({
      oauth_token: process.env.TWITTER_ACCESS_TOKEN,
      oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  } catch (e) {
    // Display the error and quit
    console.error(e);
    process.exit(1);
  }
})();
