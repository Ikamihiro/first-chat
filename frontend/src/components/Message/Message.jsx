import React from 'react';
import "./Message.css";

function Message(props) {
    const msg = JSON.parse(props.message);
    return(
        <div key={props.key} className="Message">{msg.body}</div>
    );
}

export default Message;