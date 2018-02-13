/*
 * ATTICUS SLASH COMMAND
 *
 * This is where we listen for /atticus commands. 
 * which is how we interact with atticus from a channel.
 */



/*

Supported Commands:



*/

const Express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = new Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8088

app.post('/', (req, res) => {
  let text = req.body.text;
  console.log(text);
  return res.json({
      "text": "It's 80 degrees right now.",
      "attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
    ]
  });
});

app.get('/', (req, res) => {
	console.log(req.body);
	return res.json({
    	"text": "It's 80 degrees right now.",
    	"attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
    ]
	});
});

const server = app.listen(port, () => {  
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);});