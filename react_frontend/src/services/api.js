import axios from 'axios';
import Swal from 'sweetalert2'

export const sendPDF = async (file) => {
    try {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log('File uploaded successfully:', response.data);
        Swal.fire({
            title: "Good job!",
            text: "PDF uploaded successfully!",
            icon: "success"
        });
    } catch (error) {
        if (error.response && error.response.status === 400) {
            Swal.fire({
                title: "File Already Exists",
                text: "The file you are trying to upload already exists.",
                icon: "warning"
            });
        } else {
            Swal.fire({
                title: "Upload Error",
                text: "There was an error uploading the file.",
                icon: "error"
            });
            console.error('Error uploading file:', error);
        }
    }
}

export const sendQuery = async (message) => {
    console.log(message);
    try {
        const response = await axios.post("http://127.0.0.1:8000/query/?query=" + message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const deleteDocuments = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/clear-document-store");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
    });
}


export const getDocuments = async () => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/get-all-documents");
        return response.data;
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
