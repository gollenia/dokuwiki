import axios from "axios";

const http = axios.create({
	baseURL: "",
	headers: {
	  "Content-type": "application/json",
	},
  })

  

const upload = (file: File, onUploadProgress: any) => {

	let formData = new FormData();
		
	formData.append("upload", file);
	console.log(window.localStorage.getItem('sectok'));
	
	formData.append('sectok', window.localStorage.getItem('sectok'))

	return axios.post("/?controller=media&method=upload&id=" + window.DOKU_ID, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress,
	});
};

const getFiles = () => {
  	return http.get("/files");
};

const FileUploadService = {
	upload,
	getFiles,
};

export default FileUploadService; 