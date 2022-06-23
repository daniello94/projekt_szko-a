import React from "react";
import axios from "axios";
import "./style/StudentAdd.css"

const validate = form => {

    if (!form.name) {
        return "Podaj imię"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe imię"
    };

    if (!form.lastName) {
        return "Podaj nazwisko ucznia"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe nazwisko"
    };

    if (!form.classNr) {
        return "Podaj klase ucznia"
    };

    if (!form.pesel) {
        return "wpisz pesel"
    } else if (form.pesel.length <= 10) {
        return "Podałeś za mało cyfr pesel składa się z 11 liczb"
    } else if (form.pesel.length >= 12) {
        return "Podałes za dużo cyf pesel składa się z 11 liczb"
    } else if (/\D/.test(form.pesel)) {
        return "Podałeś błędny znak pesel składa sie z samych cyfr"
    }

    if (!form.email) {
        return "Wpisz email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        return "Podaj poprawny email"
    };

    if (!form.password) {
        return "Wpisz hasło"
    } else if (form.password.length < 6) {
        return "Hasło musi zawierać minimum 6 znaków"
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(form.password)) {
        return "Hasło musi zawierać znak specjalny np: @ ! # & % $"
    } else if (!/^[^\s]*$/.test(form.password)) {
        return "Hasło nie może zawierać pustych znaków"
    }

    if(!form.nameMather){
        return "Podaj imię matki"
    }

    if(!form.nameFather){
        return "Podaj imię ojca"
    }

    if (!form.passwordRep) {
        return "Powtórz hasło"
    } else if (form.passwordRep !== form.password) {
        return "Podane hasła nie są identyczne"
    }

    if (!form.role) {
        return "Podaj typ konta"
    }
    return ""
}
export default function StudentAdd() {
    const [isActive, setActive] = React.useState(false);
    const [error, setError] = React.useState("");
    const [form, setForm] = React.useState({
        name: "",
        lastName: "",
        classNr: "",
        pesel: "",
        nameMather: "",
        nameFather: "",
        email: "",
        password: "",
        passwordRep: "",
        role: "",
        adress: {
            city: "",
            streaat: "",
            nr: "",
            zipcode: ""
        }
    });

    const addStudent = (e) => {
        e.preventDefault();
        const errorss = validate(form)
        if (errorss) {
            setError(errorss)
            setActive(!isActive)
            return    
        } else {
            const { name, lastName, pesel, classNr, nameMather, nameFather, role, email, password, passwordRep,
                    city, streaat, nr, zipcode } = form
            axios.post('http://127.0.0.1:8080/api/user/signup', {
                name, lastName, pesel, classNr, nameMather, nameFather, role, email, password, passwordRep,
                adress: {
                    city,
                    streaat,
                    nr,
                    zipcode
                }

            })
                .then(() => {
                    setError(<span>Dodałeś ucznia</span>)
                })
            setForm({
                name: "",
                lastName: "",
                pesel: "",
                classNr: "",
                nameMather: "",
                nameFather: "",
                role: "",
                email: "",
                password: "",
                passwordRep: "",
                city: "",
                streaat: "",
                nr: "",
                zipcode: ""
            })
        }
    }
    let stateStudent = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
    }
    const { name, lastName, pesel, nameMather, nameFather, email, classNr, role, password, passwordRep, city, streaat, nr, zipcode } = form

    return (
        <div className="form">
            <h2>Dodaj Ucznia </h2>
            <p className="error">{error}</p>
            <form>
                <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={name} type="text" name="name" placeholder="Podaj imie ucznia"></input>
                <input className={` ${isActive ? "error-1" : ""}`} onChange={stateStudent} value={lastName} type="text" name="lastName" placeholder="Podaj nazwisko ucznia"></input>
                <input className={` ${isActive ? "error-1" : ""}`} onChange={stateStudent} value={classNr} type="text" name="classNr" placeholder="Podaj klase ucznia"></input>

                <input className={` ${isActive ? "error-1" : ""}`} onChange={stateStudent} value={pesel} type="text" name="pesel" placeholder="Podaj PESEL ucznia"></input>
                <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={nameMather} type="text" name="nameMather" placeholder="Podaj imie matki ucznia"></input>
                <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={nameFather} type="text" name="nameFather" placeholder="Podaj imie ojca ucznia"></input>

                <label>Adress
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={city} type="text" name="city" placeholder="Miasto"></input>
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={streaat} type="text" name="streaat" placeholder="ulica"></input>
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={nr} type="text" name="nr" placeholder="numer domu"></input>
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={zipcode} type="text" name="zipcode" placeholder="Kod pocztowy"></input>
                </label>
                <label>Dane konta ucznia
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={email} type="text" name="email" placeholder="Podaj email ucznia"></input>
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} value={password} type="password" name="password" placeholder="Podaj hasło"></input>
                    <input className={`${isActive ? "error-1" : ""}`} onChange={stateStudent} type="password" value={passwordRep} name="passwordRep" placeholder="Powtórz hasło"></input>
                </label>
                <label>Typ konta
                    <select className={`${isActive ? "error-1" : ""}`} name="role" onChange={stateStudent} value={role}>
                        <option>wybierz</option>
                        <option>student</option>
                    </select>
                </label>

                <button className="btn-1" onClick={addStudent} type="submit">Dodaj</button>

            </form>
        </div>
    )
}
