import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import { loginSuccess } from "../slices/authSlice";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";

function ComposeEmail() {
  const dispatch = useDispatch();
  const senderEmail = useSelector(selectUser);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const sendEmailHandler = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const content = JSON.stringify(rawContentState);

    const receiver = recipient.replace(/[^a-zA-Z0-9]/g, "");
    dispatch(loginSuccess({ receiver }));

    const emailContent = {
      recipient: recipient,
      subject: subject,
      content: content,
      timestamp: Date.now(),
      sender: senderEmail,
    };

    try {
      const response = await axios.post(
        `https://react-https-45286-default-rtdb.firebaseio.com/mail/${senderEmail}/Send.json`,
        emailContent
      );

      console.log("Email sent successfully");
      setRecipient("");
      setSubject("");
      const senderkey = response.data.name;
      setEditorState(EditorState.createEmpty());

      const responseput = await axios.put(
        `https://react-https-45286-default-rtdb.firebaseio.com/mail/${receiver}/Receive/${senderkey}.json`,
        emailContent
      );

      console.log(responseput.data);
    } catch (error) {
      console.error("Error sending email:", error.message);
      alert("Error sending email. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div>Welcome To MailBox!!!</div>
      <hr />
      <div className="card">
        <div className="card-body">
          <input
            type="email"
            className="form-control mb-2"
            placeholder="To"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            placeholder="Write your message here..."
          />
        </div>
        <div className="card-footer bg-white text-right">
          <button className="btn btn-primary" onClick={sendEmailHandler}>
            Send
          </button>
          <br></br>
          <br></br>
          <Link to="/inbox">
            <button className="btn btn-primary " style={{ width: '150px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src='https://shopiclix.com/adminpanel/upload/images/2370-2020-02-25.jpg' className="img-fluid rounded-circle" alt="Beautiful Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                <span>inbox</span>
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default ComposeEmail;
