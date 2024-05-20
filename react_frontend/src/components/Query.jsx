/* eslint-disable react/prop-types */
import { useState } from "react";


const Query = ({ SendMessages, clearMessages }) => {
// Query component
// State variable to store the message
  const [message, setMessage] = useState('');
// Function to send a message
  const sendMessage = () => {
    // Check if the message is empty
    SendMessages({
      position: 'right',
      type: 'text',
      title: 'You',
      text: message,
      titleColor: 'blue',
      avatar: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
    });
    // Clear the input field after sending the message
    setMessage('');
  };

  // Function to handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Send the message
      sendMessage();
    }
  };

  return (
    <div className="query container">
      <div className="d-flex flex-column text-center justify-content-center">
        <div className="d-flex align-items-center mt-2 py-2 mt font-medium bg-light border border-light rounded">
          <input
            type="text"
            className="form-control mx-2 bg-light border border-light"
            placeholder="Send a message..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
          ></input>
          <button
            type="button"
            className="mx-3 btn btn-light"
            onClick={() => sendMessage()}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c598480cb24e8f535b017b17e9bafc4ae1f795f41bcf4e04f76433b07f62476d?"
              className="shrink-0 aspect-square w-22"
              alt="Button Image"
            />
          </button>
        </div>
        <div>
          <button className="m-2 btn btn-outline-warning font-monospace float-end"
            style={{ fontSize: "0.8rem" }}
            onClick={() => clearMessages()}>
            Clear Messages</button>
        </div>
      </div>
    </div>
  )
}

export default Query;
