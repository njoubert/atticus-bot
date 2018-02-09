const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');
require('dotenv').config();

// Use the Bot scope.
const token = process.env.SLACK_BOT_TOKEN

// Cache of data
const appData = {};

const web = new WebClient(token);

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});


// See: https://api.slack.com/methods/channels.list
web.channels.list()
  .then((res) => {
    // `res` contains information about the channels
    appData.intelchannels = res.channels.filter(c => c.name.startsWith("intel-") && c.is_archived == false);
    appData.intelchannels.forEach(c => console.log(c.id, c.name))
  })
  .catch(console.error);



