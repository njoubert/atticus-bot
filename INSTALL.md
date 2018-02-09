# Installation Instructions

## Managing node version with `nvm`

We rely on ES6 Javascript features, thus, using the latest NodeJS is important. 

Install from [here](https://github.com/creationix/nvm). Instructions [here](https://davidwalsh.name/nvm)

## `dotenv` and Environmental Variables

atticusbot expects environmental variables for autentication, etc. This needs to be a bot token.

We use the [dotenv](https://www.npmjs.com/package/dotenv) package to manage environmental variables. 

Create a `.env` file in your root directory. **This file is .gitignore''s**. List your app specific variables there:

```
SLACK_OATH_TOKEN=
SLACK_BOT_TOKEN=
```

