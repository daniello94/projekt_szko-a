import React from "react";
import axios from "axios";
import "./style/StudentAdd.css"

const validateNmae = form => {
    if (!form.name) {
        return "Podaj imię"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe imię"
    };
};

const validateLastName = form => {
    if (!form.lastName) {
        return "Podaj nazwisko ucznia"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe nazwisko"
    };
};

const validateClassNr = form => {
    if (!form.classNr) {
        return "Podaj klase ucznia"
    };
}

const validatePesel = form => {
    if (!form.pesel) {
        return "wpisz pesel"
    } else if (form.pesel.length <= 10) {
        return "Podałeś za mało cyfr pesel składa się z 11 liczb"
    } else if (form.pesel.length >= 12) {
        return "Podałes za dużo cyf pesel składa się z 11 liczb"
    } else if (/\D/.test(form.pesel)) {
        return "Podałeś błędny znak numer PESEL składa sie z samych cyfr"
    }
};

const validateEmail = form => {
    if (!form.email) {
        return "Wpisz email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        return "Podaj poprawny email"
    };
};

const validatePassword = form => {
    if (!form.password) {
        return "Wpisz hasło"
    } else if (form.password.length < 6) {
        return "Hasło musi zawierać minimum 6 znaków"
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(form.password)) {
        return "Hasło musi zawierać znak specjalny np: @ ! # & % $"
    } else if (!/^[^\s]*$/.test(form.password)) {
        return "Hasło nie może zawierać pustych znaków"
    }
};

const validatePasswordRep = form => {
    if (!form.passwordRep) {
        return "Powtórz hasło"
    } else if (form.passwordRep !== form.password) {
        return "Podane hasła nie są identyczne"
    }
};

const validateRole = form => {
    if (!form.role) {
        return "Podaj typ konta"
    }
};
const validate = form => {
    if (!form.name)
        return " "
}


export default function StudentAdd() {
    const [error, setError] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorPasswordRep, setErrorPasswordRep] = React.useState("");
    const [errorPesel, setErrorPesel] = React.useState("");
    const [errorName, setErrorName] = React.useState("");
    const [errorLastName, setErrorLastName] = React.useState("");
    const [errorClassNr, setErrorClassNr] = React.useState("");
    const [errorRole, setErrorRole] = React.useState("");
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
        const errorName = validateNmae(form)
        const errorLastName = validateLastName(form)
        const errorEmail = validateEmail(form)
        const errorPassword = validatePassword(form)
        const errorPasswordRep = validatePasswordRep(form)
        const errorPesel = validatePesel(form)
        const errorClassNr = validateClassNr(form)
        const errorRole = validateRole(form)
        if (errorss) {
            setError(errorss)
            setErrorName(errorName)
            setErrorLastName(errorLastName)
            setErrorEmail(errorEmail)
            setErrorPassword(errorPassword)
            setErrorPasswordRep(errorPasswordRep)
            setErrorPesel(errorPesel)
            setErrorClassNr(errorClassNr)
            setErrorRole(errorRole)
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
            <form >

                <input onChange={stateStudent} value={name} type="text" name="name" placeholder="Podaj imie ucznia" />
                <span className="error">
                    {errorName}</span>

                <input onChange={stateStudent} value={lastName} type="text" name="lastName" placeholder="Podaj nazwisko ucznia" />
                <span className="error">{errorLastName}</span>

                <input onChange={stateStudent} value={classNr} type="text" name="classNr" placeholder="Podaj klase ucznia" />
                <span className="error">{errorClassNr}</span>

                <input onChange={stateStudent} value={pesel} type="text" name="pesel" placeholder="Podaj PESEL ucznia" />
                <span className="error">{errorPesel}</span>

                <input onChange={stateStudent} value={nameMather} type="text" name="nameMather" placeholder="Podaj imie matki ucznia"></input>
                <input onChange={stateStudent} value={nameFather} type="text" name="nameFather" placeholder="Podaj imie ojca ucznia"></input>

                <label>Adress
                    <input onChange={stateStudent} value={city} type="text" name="city" placeholder="Miasto" />
                    <span ></span>

                    <input onChange={stateStudent} value={streaat} type="text" name="streaat" placeholder="ulica" />
                    <span className="error">{ }</span>

                    <input onChange={stateStudent} value={nr} type="text" name="nr" placeholder="numer domu" />
                    <span className="error"></span>

                    <input onChange={stateStudent} value={zipcode} type="text" name="zipcode" placeholder="Kod pocztowy"></input>
                </label>
                <label>Dane konta ucznia
                    <input onChange={stateStudent} value={email} type="text" name="email" placeholder="Podaj email ucznia" />
                    <span className="error">{errorEmail}</span>

                    <input onChange={stateStudent} value={password} type="password" name="password" placeholder="Podaj hasło" />
                    <span className="error">{errorPassword}</span>

                    <input onChange={stateStudent} type="password" value={passwordRep} name="passwordRep" placeholder="Powtórz hasło" />
                    <span className="error">{errorPasswordRep}</span>

                </label>
                <label>Typ konta
                    <select name="role" onChange={stateStudent} value={role}>
                        <option>wybierz</option>
                        <option>student</option>
                    </select>
                </label>
                <span className="error">{errorRole}</span>

                <button className="btn-1" onClick={addStudent} type="submit">Dodaj</button>

            </form>
        </div>
    )
}
