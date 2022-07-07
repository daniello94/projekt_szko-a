import React, { useState, useEffect } from 'react';
import axios from "axios";
import './style/Chat.css'
const validate = form => {
    if (!form.content) {
        return "Musisz wpisać wiadomość"
    }

}
export default function Chat(props) {
    const [error, setError] = useState("")
    const [more, setMore] = useState(false)
    const [form, setForm] = useState({
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: ""
    })
    const [status, setStatus] = useState([]);

    function listChat() {
        axios.get('http://127.0.0.1:8080/api/chat/all')
            .then((res) => {
                setStatus(res.data)
            })
    }

    const addMessages = (e) => {
        e.preventDefault();
        const errorss = validate(form)
        if (errorss) {
            setError(errorss)
            return
        } else {
            const { name, classNr, content } = form
            axios.post('http://127.0.0.1:8080/api/chat/add', {
                name, classNr, content
            })
                .then((res) => {
                    setForm({
                        content: "",
                        name: props.dataUser.user.name,
                        classNr: props.dataUser.user.classNr,

                    })
                    console.log(res.data);
                    listChat()
                })
        }
    }


    useEffect(() => {
        listChat()
        

    })
    let stateChat = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }
    const { name, classNr, content } = form
    return (
        <div className='container'>
            <div>
                {status.map(message => {
                    return (
                        <div className='style-messages'>
                            <span className='message-name' key={message._id}>{message.name} {message.classNr}</span><br />
                            <hr />
                            <span className='message-content'>{message.content}</span>
                        </div>
                    )
                })}
            </div>

            <div className='style-send-messages'>

                <button className="btn-chat" onClick={() => setMore(!more)}>{more ? "Ukryj pole tekstowe" : "Wyslij wiadomość czatu"}</button>

                {more &&
                    <form >
                        <p className='error'>{error}</p>
                        <label  value={name} onChange={stateChat}>{form.name} {form.classNr}
                            <input className='input-chat' value={content} onChange={stateChat} type="text" name='content' placeholder='Napisz swoja wiadomosć'></input>
                        </label>
                        <button className="btn-chat" type='submit' onClick={addMessages}>Wyslij</button>
                    </form>
                }
            </div>

        </div>
    )
}