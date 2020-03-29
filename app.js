console.log("Server is running...");

const Twit = require("twit");
const config = require("./config");
const message = require("./message");
const cron = require("node-cron");
let counter = 0;

cron.schedule("* * * * *", () => {
	let tweetsForToday = message;

	if (counter < tweetsForToday.length) {
		tweetIt(tweetsForToday[counter]);
		counter++;
	} else {
		tweetIt(tweetsForToday[counter]);
		counter = 0;
	}
});

const T = new Twit(config);

function tweetItTest(data) {
	console.log(data);
}

function tweetIt(data) {
	let tweet = {
		status: data
	};
	T.post("statuses/update", tweet, tweeted);
	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("Tweet posted!");
		}
	}
}
