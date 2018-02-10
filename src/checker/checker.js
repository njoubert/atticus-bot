const request = require('request');
const crypto = require('crypto');
const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');

require('dotenv').config();



const db = require('../db/');

// Posts a message to Slack with the given site details.
function poster(site) {
  message = 'Fresh organic homegrown content! ' + site.url;
  
  console.log(message);


  const token = process.env.SLACK_BOT_TOKEN
  const web = new WebClient(token);

  const appData = {};

  const rtm = new RtmClient(token, {
    dataStore: false,
    useRtmConnect: true,
  });

  web.chat.postMessage(site.channelid, message);
}

// Checks all sites for changes.
//   approach: compare hash of body html.
var check_all_sites = function (onchange) {
  db.sites.forEach(site => {
    if (!site.hash) {
      request(site.url, function(error, response, body) {
        if (response.statusCode < 400) {
          var hasher = crypto.createHash('sha256');
          hasher.update(body);
          site.hash = hasher.digest('hex');
          site.lastchecked = (new Date()).toString();
        }
      });
    } else {
      request(site.url, function(error, response, body) {
        if (response.statusCode < 400) {
          var hasher = crypto.createHash('sha256');
          hasher.update(body);
          newhash = hasher.digest('hex');
          site.lastchecked = (new Date()).toString();
          if (newhash != site.hash) {
            site.hash = newhash;
            onchange(site);
          }
        }
      });    
    }
  });
}

// Repeatedly call `checker()`
function repeat() {
  console.log((new Date()).toString(), "checking sites");
  check_all_sites(poster);
  setTimeout(repeat, 5000);
}
repeat();

// Exit if we silently fail.
process.on('unhandledRejection', (err) => { 
  console.error(err)
  process.exit(1)
})