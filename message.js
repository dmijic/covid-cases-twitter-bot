const url = "https://coronavirus-19-api.herokuapp.com/countries";

const EasyHTTP = require("./easyhttp");

const http = new EasyHTTP();

const hashtagCollection = [
	"SocialDistancing",
	"FlattenTheCurve",
	"WashYourHands",
	"WashYourHandsChallenge",
	"StayAtHomeAndStaySafe",
	"WearAMask",
	"StayAtHome"
];

const getTweets = () => {
	let listOfTweets = [];
	http.get(url)
		.then(data => {
			data.forEach(element => {
				listOfTweets.push(createListItem(element));
			});
		})
		.catch(err => console.log(err));
	return listOfTweets;
};

const randomHashtag = input => {
	if (input === undefined) {
		return hashtagCollection[Math.floor(Math.random() * 7)];
	} else {
		let newHashtagCollection = hashtagCollection.filter(function(
			value,
			index,
			arr
		) {
			return value != input;
		});

		return newHashtagCollection[Math.floor(Math.random() * 6)];
	}
};

function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function createListItem(element) {
	let hashtagCountry = element.country.replace(/ /g, "");
	let hashtagOne = randomHashtag();
	let hashtagTwo = randomHashtag(hashtagOne);
	let tweet = `There ${
		element.cases === 1 ? "has" : "have"
	} been ${numberWithCommas(element.cases)} confirmed ${
		element.cases === 1 ? "case" : "cases"
	} of #COVID19 in #${hashtagCountry} up to this moment, of which ${numberWithCommas(
		element.deaths
	)} ${element.deaths === 1 ? "person" : "people"} died (${
		element.todayDeaths
	} today). There ${element.critical === 1 ? "is" : "are"} ${
		element.critical === 0 ? "" : "still"
	} ${element.critical === 0 ? "no" : numberWithCommas(element.critical)} ${
		element.critical === 1 ? "patient" : "patients"
	} in critical condition${
		element.critical === 0
			? "."
			: " and " +
			  numberWithCommas(element.recovered) +
			  " people have recovered from the disease."
	} #${hashtagOne} #${hashtagTwo}`;
	return tweet;
}

module.exports = getTweets();
