import React from "react";
import axios from "axios";
import "./style/StudentAdd.css"

const validate = form => {
    if (!form.name) {
        return "Podaj imię ucznia"
    }

    if (!form.password) {
        return "Podaj Hasło"
    }
    return ""
}
export default function StudentAdd() {
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
            return
        } else {
            const { name,
                lastName,
                pesel,
                classNr,
                nameMather,
                nameFather,
                role,
                email,
                password,
                adress: {
                    city,
                    streaat,
                    nr,
                    zipcode
                }


            } = form
            axios.post('http://127.0.0.1:8080/api/user/signup', {
                name,
                lastName,
                pesel,
                classNr,
                nameMather,
                nameFather,
                role,
                email,
                password,
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
                classNr:"",
                nameMather: "",
                nameFather: "",
                role: "",
                email: "",
                password: "",
                adress: {
                    city: "",
                    streaat: "",
                    nr: "",
                    zipcode: ""
                }

            })
        }



    }
    let stateStudent = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const { name,
        lastName,
        pesel,
        nameMather,
        nameFather,
        email,
        classNr,
        role,
        password,
        adress: {
            city,
            streaat,
            nr,
            zipcode
        }
    } = form
    return (
        <div className="form">
            <h2>Dodaj Ucznia </h2>
            <p>{error}</p>
            <form>
                <input onChange={stateStudent} value={name} type="text" name="name" placeholder="Podaj imie ucznia"></input>
                <input onChange={stateStudent} value={lastName} type="text" name="lastName" placeholder="Podaj nazwisko ucznia"></input>
                <input onChange={stateStudent} value={classNr} type="text" name="classNr" placeholder="Podaj klase ucznia"></input>

                <input onChange={stateStudent} value={pesel} type="text" name="pesel" placeholder="Podaj PESEL ucznia"></input>
                <input onChange={stateStudent} value={nameMather} type="text" name="nameMather" placeholder="Podaj imie matki ucznia"></input>
                <input onChange={stateStudent} value={nameFather} type="text" name="nameFather" placeholder="Podaj imie ojca ucznia"></input>

                <label>Adres
                    <input onChange={stateStudent} value={city} type="text" name="city" placeholder="Miasto"></input>
                    <input onChange={stateStudent} value={streaat} type="text" name="streaat" placeholder="ulica"></input>
                    <input onChange={stateStudent} value={nr} type="text" name="nr" placeholder="numer domu"></input>
                    <input onChange={stateStudent} value={zipcode} type="text" name="zipcode" placeholder="Kod pocztowy"></input>
                </label>
                <label>Dane konta ucznia
                    <input onChange={stateStudent} value={email} type="text" name="email" placeholder="Podaj email ucznia"></input>
                    <input onChange={stateStudent} value={password} type="password" name="password" placeholder="Podaj hasło"></input>
                    <input type="password" name="password" placeholder="Powtórz hasło"></input>
                </label>
                <label>Typ konta
                    <select name="role" onChange={stateStudent} value={role}>
                        <option>wybierz</option>
                        <option>student</option>
                    </select>
                </label>

                <button className="btn-1" onClick={addStudent} type="submit">Dodaj</button>

            </form>
        </div>
    )
}
