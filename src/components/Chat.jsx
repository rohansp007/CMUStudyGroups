import { useState } from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import {auth, db} from "../firebase-config"

export const Chat = (props) => {
    const {room} = props
    //input variable to be sent to db
    const [newMessage, setNewMessage] = useState("");

    //reference to the collection in the db
    const messagesRef = collection(db, "messages");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newMessage);
        if (newMessage === "" ) return;

        //the gold, api call, object input
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })

        setNewMessage("") 
    };

    return (
        <div className="chat-app"> 
            Chat
            <form onSubmit={handleSubmit} className = "new-message-form">
                <input 
                    className = "new-message-input"
                    placeholder = "Type your message here..."
                    onChange = {(e) => setNewMessage(e.target.value)}
                    value = {newMessage}
                />
                <button type = "submit" className = "send-button"> 
                    Send
                </button>
            </form>
        </div>
    )
}