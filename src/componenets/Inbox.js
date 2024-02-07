import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { selectReceivedMail, setReceivedMail } from "../slices/emailSlice";
import { selectUser } from "../slices/authSlice";

const Inbox = () => {
    const userId = useSelector(selectUser)
    const receivedMail = useSelector(selectReceivedMail) || [];
    const [unreadCount, setUnreadCount] = useState(0);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get(`https://react-https-45286-default-rtdb.firebaseio.com/mail/${userId}/Receive.json`);
                console.log("Response:", response); // Log the response to see its structure
                if (response.status === 200) {
                    const data = response.data;
                    console.log("Data:", data); // Log the data to see its content
                    if (data) {
                        const emailsArray = Object.entries(data).map(([id, email]) => ({ id, ...email }));
                        console.log("Emails Array:", emailsArray); // Log the emailsArray to see its contents
                        dispatch(setReceivedMail(emailsArray));
                    } else {
                        console.error("No emails found.");
                    }
                } else {
                    throw new Error('Failed to fetch emails');
                }
            } catch (error) {
                console.error("Error fetching emails:", error);
                // Handle error gracefully, show a message to the user
            }
        };
        fetchEmails();
    }, [dispatch, userId]);

    const composeHandler = () => {
        navigate('/compose');
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link className="list-group-item list-group-item-action active" to='/inbox'>
                            Inbox ({unreadCount} unread)
                        </Link>
                        <Link className="list-group-item list-group-item-action" to='/'>Sent </Link>
                        <p className="list-group-item list-group-item-action">Drafts</p>
                        <p className="list-group-item list-group-item-action">Trash</p>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header">Message</div>

                        {selectedEmail && (
                            <div className="card-body" onClick={() => setSelectedEmail(null)}>
                                <h5 className="card-title">{selectedEmail.recipient}</h5>
                                <p className="mb-1">{selectedEmail.subject}</p>
                                <p className="card-text">{selectedEmail.content}</p>
                            </div>
                        )}

                        {!selectedEmail && (
                            <div className="list-group">
                                {receivedMail.map((email, index) => (
                                    <div key={index} className={`list-group-item list-group-item-action ${email.read ? '' : 'unread'}`} onClick={() => setSelectedEmail(email)}>
                                        <span className="dot"></span>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">{email.sender}</h6>
                                                <p className="mb-1">{email.subject} </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-sm rounded-circle" style={{ width: '50px', height: '40px' }} onClick={composeHandler}>
                <img src='https://i.pinimg.com/736x/f4/b9/3a/f4b93a502f60397fe92b663ddb9e683d.jpg' className="img-fluid rounded-circle" alt="Profile" />
            </button>
        </div>
    );
};

export default Inbox;
