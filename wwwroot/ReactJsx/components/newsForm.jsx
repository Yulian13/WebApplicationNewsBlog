import { InputImage } from './inputImage.jsx'
import { loadNews } from './News.jsx'
import { loadLocalizs } from './localizer.jsx'

export class NewsForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			Id:			"00000000-0000-0000-0000-000000000000",
			Title:		"",
			SubTitle:	"",
			Text:		"",
			Image:		"",
			Localizs: {
				get: () => { },
			},
		};

		loadLocalizs(
			(localizs) => {
				this.inputImage.current.state.Localizs = localizs;
				this.setState({
					Localizs: localizs
				});
			}
		);

		loadNews(
			this.props.NewsId,
			(news) => this.setState({
				Id:			news.id,
				Title:		news.title,
				SubTitle:	news.subTitle,
				Text:		news.text,
				Image:		news.image,
			})
		);

		this.inputImage = React.createRef();
	}

	onChange(stateProperty ,e) {
		const value = e.target.value;
		this.setState({ [stateProperty]: value });
	}

	validateTitle() {
		return Boolean(this.state.Title);
	}

	validateLengthTitle() {
		return Boolean(this.state.Title.length < 50);
	}

	validateText() {
		return Boolean(this.state.Text);
	}

	render() {
		const isValidTitle = this.validateTitle();
		const isValidText = this.validateText();
		const isValidLengthText = this.validateLengthTitle();

		const titleColor = (isValidTitle && isValidLengthText) ? "black" : "red";
		const textColor =	isValidText ? "black" : "red";
		const isValidForm = isValidTitle && isValidText && isValidLengthText;
		var t = this.inputImage;

		return <form method="post" enctype="multipart/form-data" action="/Admin/SaveNews">
			<div>
				<input type="hidden" name="Id" value={this.state.Id} />
				<div class="form-group">
					<label for="Title">{ this.state.Localizs.get("TitleCaption") }*</label>
					<input type="text" data-val="true" id="Title" name="Title" value={this.state.Title} onChange={this.onChange.bind(this, "Title")} style={{ borderColor: titleColor }}/>
					<span class="field-validation-valid" data-valmsg-for="Title" data-valmsg-replace="true">
						{isValidLengthText ? "" : this.state.Localizs.get("ValidationLengthTitleMessage")}
					</span>
				</div>
				<div class="form-group">
					<label for="SubTitle">{this.state.Localizs.get("SubTitleCaption")}</label>
					<input type="text" data-val="true" id="SubTitle" name="SubTitle" value={this.state.SubTitle} onChange={this.onChange.bind(this, "SubTitle")}/>
					<span class="field-validation-valid" data-valmsg-for="SubTitle" data-valmsg-replace="true"></span>
				</div>
				<div class="form-group">
					<label for="Text">{this.state.Localizs.get("TextCaption")}*</label>
					<textarea type="text" data-val="true" id="Text" name="Text" value={this.state.Text} onChange={this.onChange.bind(this, "Text")} style={{ borderColor: textColor }}/>
					<span class="field-validation-valid" data-valmsg-for="Text" data-valmsg-replace="true"></span>
				</div>
				<InputImage Image={this.state.Image} Localizs={this.state.Localizs} ref={this.inputImage}/>
				<div class="form-group">
					<input type="submit" disabled={!isValidForm} value={this.state.Localizs.get("SaveButtonCaption")} class="btn btn-outline-dark" />
				</div>
			</div>
		</form>;
	}
}