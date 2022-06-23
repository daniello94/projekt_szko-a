import React, { useState,useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const validate = (form) => {
    if (!form.email) {
        return "wpisz login"
    }if(form.email !== form.data){
        return "Hasło bądź nazwa urzytkownika są nieprawidłowe"
    }

    if (!form.password) {
        return "wpisz hasło"
    }
};

export default function Login(props) {
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
  

    const userSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8080/api/user/login',
            ({
                email: email,
                password: password
            }))
            .then((req) => {
                if (!req.data.success) {
                    const errorss = validate(form)
                    if (errorss) {
                        setError(errorss)
                        e.preventDefault()
                        return
                    }
                } else {
                    props.setUser(req.data)
                    localStorage.setItem('user', JSON.stringify(req.data))
                }
           })
          
    };
  
    let stateLogin = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const { email, password } = form;

    return (
        <div>
            {props.user && <Navigate to={`/userData/${form.id}`} />}
            <p className="error">{error}</p>
            <form onSubmit={userSubmit}>
                <h3>Logowanie</h3>
                <input type="text" value={email} onChange={stateLogin} name="email" placeholder="Podaj Login"></input>
                <input type="password" value={password} name="password" onChange={stateLogin} placeholder="Podaj Hasło"></input>
                <button className="btn-1"  type="submit">Zaloguj</button>
            </form>
        </div>
    )
};