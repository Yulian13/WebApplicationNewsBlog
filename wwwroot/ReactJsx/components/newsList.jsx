export class NewsList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.state.NewsList = [];
		this.state.NumberStep = 0;
		this.state.Step = props.NumberNews;
		this.state.DynamicDownload = props.DynamicDownload;

		window.onscroll = this.onScroll.bind(this);
		this.loadNews();
	}

	loadNews() {
		var httpRequest = new XMLHttpRequest();
		const url = `/api/News/GetNewsCollectionForList?step=${this.state.Step}&skipStep=${this.state.NumberStep}`;
		httpRequest.open('POST', url, true);
		httpRequest.setRequestHeader("Content-Type", "application/json");
		httpRequest.onload = function () {
			if (httpRequest.status == 200) {
				var newsCollection = JSON.parse(httpRequest.responseText);

				if (newsCollection.length == 0) {
					this.setState({ DynamicDownload: false });
                }

				newsCollection = this.state.NewsList.concat(newsCollection);
				const numberStep = this.state.NumberStep + 1;

				this.setState({ NewsList: newsCollection, NumberStep: numberStep });

				const isHaveScroll = Boolean(document.body.offsetHeight < window.innerHeight);
				if (isHaveScroll && this.state.DynamicDownload) {
					this.loadNews();
				}
			}
		}.bind(this);
		httpRequest.send();
	}

	onScroll(){
		const isEndScroll = (window.scrollY + window.innerHeight) == document.scrollingElement.offsetHeight;
		if (isEndScroll && this.state.DynamicDownload) {
			this.loadNews();
		}
	}

	render() {
		const listItems = this.state.NewsList.map((news) => 
			<div class="newInList">
				<a href={`/Home/News/${news.id}`} class="nav-link text-dark">{news.title}</a>
				<div style={{ width: '100%' }}>
					<span style={{ float: 'left' }}>{news.subTitle}</span>
					<span style={{ float: 'right' }} >{news.createdOn}</span>
				</div>
			</div>
		);
		return <div>
			{listItems}
		</div>;
	}
}