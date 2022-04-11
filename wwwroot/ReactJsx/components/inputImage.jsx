export class InputImage extends React.Component { 
	inputDom = null;

	constructor(props) {
		super(props);
		this.OnLoadImage = this.OnLoadImage.bind(this);
		this.ResetImage = this.ResetImage.bind(this);

		this.state = {
			Image: this.props.Image,
			Localizs: this.props.Localizs,
			IsChangeImage: false,
			
		}
	}

	static getDerivedStateFromProps(props, state) {
		const isSetImageFromProps = Boolean(!state.IsInitImage && props.Image);
		if (isSetImageFromProps) {
			state.Image = props.Image
			state.IsInitImage = true;
		}

		return state;
	}

	OnLoadImage() {
		const file = this.inputDom.files[0];
		if (file) {
			var reader = new FileReader()
			reader.onload = function (e) {
				this.setState({ Image: e.target.result, IsChangeImage: true });

			}.bind(this);
			reader.readAsDataURL(file);
		}
	}

	ResetImage() {
		this.inputDom.value = "";
		this.setState({ Image: "", IsChangeImage: true });
	}

	render() {
		const minWidthOfImageDiv = Boolean(this.state.Image) ? '0px' : '';

		return <div class="form-group">
			<input type="hidden" name="IsChangeImage" value={this.state.IsChangeImage} />
			<div class="inputRow">
				<button onClick={() => this.inputDom.click()} type="button">{this.state.Localizs.get("UploadImageButtonCaption")}</button>
				<input type="file" data-val="true" id="Image" name="Image" onChange={this.OnLoadImage} style={{ display: 'none' }}/>
				<button onClick={this.ResetImage} type="button" class="btn btn-outline-dark">{this.state.Localizs.get("ResetImageButtonCaption")}</button>
			</div>
			<span class="field-validation-valid" data-valmsg-for="Image" data-valmsg-replace="true"></span>
			<div class="iconWrapper" style={{ minWidth: minWidthOfImageDiv }}>
				<img id="UpLoadImage" src={this.state.Image} />
			</div>
		</div>;
	}

	componentDidMount() {
		this.inputDom = document.getElementById("Image");
		this.OnLoadImage();
	}
}