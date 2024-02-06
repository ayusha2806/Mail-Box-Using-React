import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../slices/emailSlice';

function ComposeEmail() {
  const dispatch = useDispatch();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const sendEmailHandler = async () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const emailContent = {
      recipient: recipient,
      subject: subject,
      content: content,
      timestamp: Date.now(),
    };

    dispatch(sendEmail(emailContent));
  
    try {
      await fetch('https://react-https-45286-default-rtdb.firebaseio.com/mail.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      });
      
      console.log("mail sent sucessfully");

      setRecipient('');
      setSubject('');
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };

  return (
    
    <div className="container mt-4">
      <div>Welcome To MailBox!!!</div>
      <hr></hr>
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
        </div>
      </div>
    </div>
  );
}

export default ComposeEmail;
