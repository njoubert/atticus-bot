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

## Feeding Information into Slack

### RSS Feeds

RSS feeds are natively supported by Slack. Add RSS feeds to channels as follows:

```
/feed subscribe <URL>
```

I use a Chrome Extension to find RSS feed links.

### IFTTT 

#### Craigslist
