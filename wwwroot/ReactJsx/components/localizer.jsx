export function loadLocalizs(callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/api/ReactLocaliz/GetLocalizs', true);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.onload = function () {
		var localizs = {};
		if (httpRequest.status == 200) {
			localizs = JSON.parse(httpRequest.responseText);
		}

		callback(new Localizs(localizs));
	}.bind(this);

	httpRequest.send();
}

class Localizs {
	Localizs = {}

	constructor(localizs) {
		this.Localizs = localizs;
	}

	get(key) {
		return this.Localizs[key] || "";
    }
}