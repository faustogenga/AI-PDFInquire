import { useEffect, useState } from "react";
import { deleteDocuments, getDocuments, sendPDF } from "../services/api";
import Swal from 'sweetalert2'

const Header = () => {
    // State variables
    const [documents, setDocuments] = useState([])
    // useEffect hook to get the documents from the server
    useEffect(() => {
        getDocumentsNames();
    }, [])
    // Function to get the documents from the server
    const getDocumentsNames = () => {
        // Get the documents from the server
        const response = getDocuments();
        // Set the documents state variable
        response.then((data) => {
            setDocuments(data.documents);
        });
    }

    // Function to handle file upload
    const handleFileUpload = async (e) => {
        // Get the file
        const file = e.target.files[0];
        // Check if the file is a PDF file
        if (isPDF(file)) {
            console.log("File is a PDF file");
        }
        // If the file is not a PDF file, show an error message
        else {
            Swal.fire("Please upload a PDF file!");
            return;
        }
        // Check if the file size is less than 10MB
        if (file.size > 10000000) {
            Swal.fire("File size is too large! Please upload a file less than 10MB.");
            return;
        }
        // Check if the file is empty
        if (file.size === 0) {
            Swal.fire("File is empty! Please upload a non-empty file.");
            return;
        }
        // Check if the file already exists
        if (file.name in documents) {
            Swal.fire("File aaaalready exists! Please upload a new file.");
            return;
        }
        // Send the PDF file to the server
        await sendPDF(file);
        // Get the updated list of documents
        getDocumentsNames();
    }

    // Function to check if the file is a PDF file
    const isPDF = (file) => {
        // Get the file extension
        const extension = file.name.split('.').pop().toLowerCase();

        // Check if the extension indicates a PDF file
        return extension === 'pdf';
    };

    // Function to delete all the documents
    const deleteDocumentsConfirm = () => {
        // Check if there are any documents
        if (documents.length === 0) {
            Swal.fire("Please upload a PDF first!");
            return
        }
        // Show a confirmation message
        Swal.fire({
            title: "Deleting PDFs?",
            text: "Are you sure you want to delete all PDFs?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            // If the user confirms the deletion, delete the PDFs
            if (result.isConfirmed) {
                handleDeletePDFs();
            }
        });
    }

    // Function to delete the documents
    const handleDeletePDFs = async () => {
        // Delete the documents
        await deleteDocuments();
        // Get the updated list of documents
        getDocumentsNames();
        // Reload the page
        window.location.reload();
    }


    return (
        <>
            <div className="header d-flex flex-row justify-content-between py-4 font-weight-bold text-black shadow-sm">
                <div className="col-auto">
                    <img
                        loading="lazy"
                        src="/AI Planet Logo.png"
                        className="mx-1 img-fluid aspect-ratio-2-56 w-10"
                    />
                </div>
                <div className="header-items col-auto mx-1">
                    <div className="d-flex float-start">
                        <div className="header-items-files d-flex">
                            {documents.map((doc, index) => (
                                <div className="m-1 badge rounded-pill text-bg-success " key={index}>{doc}</div>
                            ))}
                        </div>
                    </div>
                    <div className="header-buttons d-flex">
                        <label htmlFor="fileInput" className="header-items-PDF px-4 btn btn-outline-dark" style={{ fontSize: "0.8rem" }} ></label>
                        <input type="file" id="fileInput" className="row d-none" onChange={handleFileUpload} />
                        <button className="mx-1 header-items-clear px-4 btn btn-outline-danger" style={{ fontSize: "0.8rem" }} onClick={deleteDocumentsConfirm}></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
