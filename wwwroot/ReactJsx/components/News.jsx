export function loadNews(id, callback) {
	const body = JSON.stringify({
		Id: id
	});
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/api/News/GetNews', true);
	httpRequest.setRequestHeader("Content-Type", "application/json");
	httpRequest.onload = function() {
		if (httpRequest.status == 200) {
			const news = JSON.parse(httpRequest.responseText);
			news.image = "data:image/jpeg;base64," + news.image;
			callback(news);
		}
	}.bind(this);

	httpRequest.send(body);
}