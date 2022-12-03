import React from 'react';



class Main extends React.Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		imageURL: '',
	  }
  
	  this.handleUploadImage = this.handleUploadImage.bind(this);
	}
  
	handleUploadImage(ev) {
	  ev.preventDefault();
  
	  const data = new FormData();
	  data.append('file', this.uploadInput.files[0]);
	  data.append('filename', this.fileName.value);
  
	  fetch('http://localhost:5500/upload', {
		mode: 'no-cors',
		method: 'POST',
		headers:{
		  "Access-Control-Allow-Origin" : "*", 
		  "Access-Control-Allow-Credentials" : true 
		},
		body: data
	  }).then((res) => res.json()).then((body) => {
		console.log(body)
	  });
	}
  
	render() {
	  return (
		<form onSubmit={this.handleUploadImage}>
		  <div>
			<input ref={(ref) => { this.uploadInput = ref; }} type="file" />
		  </div>
		  <div>
			<input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
		  </div>
		  <br />
		  <div>
			<button>Upload</button>
		  </div>
		  <img src={this.state.imageURL} alt="img" />
		</form>
	  );
	}
  }
  
  export default Main;

  export default function ManageFiles() {
	return <div>Manage your files here</div>;
}