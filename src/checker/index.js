/*
 * ATTICUS SITE CHECKER
 *
 * Handles periodic checking of all sites.
 */

const request = require('request');
const crypto = require('crypto');
const path = require('path');
const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');
const db = require('../db/');

require('dotenv').config();


// Posts a message to Slack with the given site details.
var poster = function (site) {
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
  var changed_sites = [];
  db.sites.forEach(site => {
    console.log("checking", site.url)
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
            changed_sites.push(site);
            onchange(site);
          }
        }
      });    
    }
  });
}

exports.check = function() {
  return check_all_sites(poster);
}
