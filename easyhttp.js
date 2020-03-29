const fetch = require("node-fetch");

class EasyHTTP {
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	put(url, data) {
		return new Promise((resolve, reject) => {
			fetch(`${url}/${data.id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}

	delete(url, idToDelete) {
		return new Promise((resolve, reject) => {
			fetch(`${url}/${idToDelete}`, {
				method: "Delete",
				headers: {
					"content-type": "application/json"
				}
			})
				.then(res => res.json())
				.then(() => resolve("Resource deleted"))
				.catch(err => reject(err));
		});
	}
}

module.exports = EasyHTTP;
