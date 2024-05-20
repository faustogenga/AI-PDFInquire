import axios from 'axios';
import Swal from 'sweetalert2'

// Function to send the PDF file to the server
export const sendPDF = async (file) => {
    // Create a FormData object
    try {
        const formData = new FormData();
        // Append the file to the FormData object
        formData.append('file', file);
        // Send the PDF file to the server
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
            // Show an error message if the file already exists
            Swal.fire({
                title: "File Already Exists",
                text: "The file you are trying to upload already exists.",
                icon: "warning"
            });
        } else {
            // Show an error message if there was an error uploading the file
            Swal.fire({
                title: "Upload Error",
                text: "There was an error uploading the file.",
                icon: "error"
            });
            console.error('Error uploading file:', error);
        }
    }
}

// Function to send a message
export const sendQuery = async (message) => {
    try {
        // Send the message to the server
        const response = await axios.post("http://127.0.0.1:8000/query/?query=" + message);
        // Return the response
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

// Function to delete all the documents
export const deleteDocuments = async () => {
    try {
        // Send a request to the server to delete all the documents
        const response = await axios.post("http://127.0.0.1:8000/clear-document-store");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    // Show a success message
    Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
    });
}

// Function to get the list of documents
export const getDocuments = async () => {
    try {
        // Send a request to the server to get the list of documents
        const response = await axios.post("http://127.0.0.1:8000/get-all-documents");
        return response.data;
    }
    // Show an error message if there was an error getting the documents
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
