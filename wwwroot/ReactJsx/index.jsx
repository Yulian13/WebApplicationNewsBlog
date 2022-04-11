import { NewsList } from './components/newsList.jsx'
import { NewsForm } from './components/newsForm.jsx'

const numberNewsForStep = 5;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Routes = ReactRouterDOM.Routes;

const reactContent = document.getElementById("ReactContent");
if (reactContent) {
	const newsId = reactContent.getAttribute('newsid');

	ReactDOM.render(
		<Router>
			<div>
				<Routes>
					<Route path="/*" element={<NewsList NumberNews={numberNewsForStep} DynamicDownload={false}/>} />
					<Route path="/Home/NewsList*" element={<NewsList NumberNews={numberNewsForStep} DynamicDownload={true}/>} />
					<Route path="/Admin/NewsForm*" element={<NewsForm NewsId={newsId} />} />
				</Routes>
			</div>
		</Router>
		, reactContent
	);
}