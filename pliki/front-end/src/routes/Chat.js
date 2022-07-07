import React, { useState, useEffect } from 'react';
import axios from "axios";


export default function Chat() {
    const [status, setStatus] = useState({
        content: "",
        name: "",
        classNr: ""
    })
    function listChat() {
        axios.get('http://127.0.0.1:8080/api/chat/all')
            .then((res) => {
                setStatus(res.data)
                console.log(res.data);
            })
            console.log(status.name);

    }


    useEffect(() => {
        listChat()

    }, [])
    return (
        <div>
            <p>{status.content}</p>
        </div>
    )
}