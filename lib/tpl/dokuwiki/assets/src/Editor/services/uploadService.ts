import axios from 'axios';

const http = axios.create({
    baseURL: '',
    headers: {
        'Content-type': 'application/json',
    },
});

const upload = (file: File, onUploadProgress: any, target = '') => {
    let formData = new FormData();

    formData.append('upload', file);

    formData.append('sectok', window.localStorage.getItem('sectok'));

    if (target == '') target = window.DOKU_ID;

    return axios.post('/?controller=media&method=upload&id=' + target, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });
};

const getFiles = () => {
    return http.get('/files');
};

const FileUploadService = {
    upload,
    getFiles,
};

export default FileUploadService;
