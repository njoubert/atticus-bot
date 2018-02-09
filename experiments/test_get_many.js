const request = require('request');
const crypto = require('crypto');
const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');

require('dotenv').config();



sites = [
	{'channelid':'C96CJHFV0', 'url': 'http://njoubert.com/'},
	{'channelid':'C96CJHFV0', 'url': 'http://graphics.stanford.edu/~mlrobert/'},
	{'channelid':'C96CJHFV0', 'url': 'http://obrien.berkeley.edu/Prof._James_F._OBrien/Home.html'},
	{'channelid':'C96CJHFV0', 'url': 'http://www.artoonie.com/'},
	{'channelid':'C96CJHFV0', 'url': 'https://people.eecs.berkeley.edu/~jrs/'},
	{'channelid':'C96CJHFV0', 'url': 'https://dritchie.github.io/'},
	{'channelid':'C96CJHFV0', 'url': 'http://graphics.stanford.edu/~mdfisher/publications.html'},
	{'channelid':'C96CJHFV0', 'url': 'http://www.niessnerlab.org/publications.html'},
	{'channelid':'C96CJHFV0', 'url': 'https://graphics.stanford.edu/~kbreeden/'},
  {'channelid':'C96CJHFV0', 'url': 'https://google.com/'}
];

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
function checker(onchange) {
  sites.forEach(site => {
    if (!site.hash) {
      request(site.url, function(error, response, body) {
        if (response.statusCode < 400) {
          var hasher = crypto.createHash('sha256');
          hasher.update(body);
          site.hash = hasher.digest('hex');
          site.lastchecked = new Date();
        }
      });
    } else {
      request(site.url, function(error, response, body) {
        if (response.statusCode < 400) {
          var hasher = crypto.createHash('sha256');
          hasher.update(body);
          newhash = hasher.digest('hex');
          site.lastchecked = new Date();
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
  checker(poster);
  setTimeout(repeat, 5000);
}
repeat();

// Exit if we silently fail.
process.on('unhandledRejection', (err) => { 
  console.error(err)
  process.exit(1)
})