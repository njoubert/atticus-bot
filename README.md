# Atticus the Hipster Slackbot & Using Slack as an Aggregator

**Atticus the Hipster Slackbot.** 

_Atticus keeps you on the cutting edge of your interests. Yes, we've automated the First Mover Advantage_

## Motivation / Problem Statement

During my time as a Stanford PhD student, I was effortlessly familiar with the latest developments in Computer Science. It was effortless, since people came _to_ us and _told_ us about their latest work. All I had to do was show up for lunch. The benefits of being on the bleeding edge is extensive. I would like to stay familiar with the latest developments in my areas of interest, but I no longer have the community-by-default of campus life. 

How do I keep track of the work produced by *people*, *publications*, and *organizations*?

There are as many approaches to the problem as there are sources of this data. On the one end of the spectrum lies syndicated news organizations. In the middle lies email digests, reddit and hacker news pages, conference proceedings, etc. And at the obscure end lies personal webpages. These days much of this data is tied into social media, especially twitter. 

I'd like a *push-based*, *flexible* system. I believe **Slack** might be the current best framework to build a solution for this problem. That's the system described in this document.

## How To Use Slack as an Aggregator

**Organizing Feeds into Channels**

I organize feeds by interest. I use the convention that `#intel-` channels have automated feeds posting data.  

![](https://raw.githubusercontent.com/njoubert/atticus-bot/master/assets/slack-channels-01.png)

**Mute channels that you don't want notifications for**

![](https://github.com/njoubert/atticus-bot/blob/master/assets/slack-mute.png)

## Feeding Information into Slack (Not Atticus)

### RSS Feeds

Many blogs and news sources provide RSS feeds: a continually updated list of theeir content. RSS feeds are natively supported by Slack. Add RSS feeds to channels as follows:

```
/feed subscribe <URL>
```

RSS links can be hard to find. I use a Chrome Extension to find RSS feed links: ["Get RSS Feed URL"](https://github.com/shevabam/get-rss-feed-url-extension)

#### Youtube Channels

Youtube Channels provide RSS feeds! This is a great way to keep up to date on high quality content, such as new university courses.

### IFTTT 

IFTTT ("if this, then that") can connect a large set of online services to Slack. It makes it _very simple_ to connect services to Slack, but it doesn't have much customization options.

It works especially great if you want to monitor a _search_, such as Craigslist, for new results.

#### Craigslist

I use IFTTT.com to monitor Craigslist searches.

## Using Atticus

Atticus is designed to cover the _non-mainstream_ areas of the internet. Things like personal webpages (No RSS feed, no IFTTT). Atticus will post to the slack channel of your choosing whenever something happens in the dark corners of the internet.


## Example Use Cases of this Setup
