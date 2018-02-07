# Notes

following this: https://slackapi.github.io/node-slack-sdk/getting_started

Seems like `incoming webhooks` can only post to one slack channel at a time? that won't work for my use case :(

Here's atticutbot: https://api.slack.com/apps/A954PNJ3X


# Design Outline 1:

## Step 1: Check-and-Post

- database with list of websites to monitor
--- each website has a channel associated with it, kinda like a category.
--- each website also has a last glob or hash or something. (hash is probably a good start? fails for anything dynamic though)

- when you run, go through all the websites and find which has changed.
- if changed, post an update to the appropriate slack channel.

P0: Just a list of websites. Loop over, check, then post to slack if changed. 
P1: Actually do a real DB.
P2: Deploy to njoubert.com using Docker
P3: Rate-limit per-site
P4: Fancier diffing, like use PhantomJS or something
P5: Fancier extraction?

## Step 2: slash command

- add sites programmatically
- get a list of sites monitored in each channel


