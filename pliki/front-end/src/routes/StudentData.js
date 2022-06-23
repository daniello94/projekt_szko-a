import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function StudentData() {
    const [status, setStatus] = useState({
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

    let { id } = useParams();

    function oneStudent(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    }

    useEffect(() => {
        oneStudent(id)
    }, []);
    return (
        
             <div className="table">
            <table>
                <thead>
                    <tr>
                        <th colSpan="3">Uczeń {status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Klasa</td>
                        <td>{status.classNr}</td>
                    </tr>
                    <tr>
                        <td>Pesel</td>
                        <td>{status.pesel}</td>
                    </tr>
                    <tr>
                        <td>Imie Matki</td>
                        <td>{status.nameMather}</td>
                    </tr>
                    <tr>
                        <td>Imie Ojca</td>
                        <td>{status.nameFather}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{status.email}</td>
                    </tr>
                    <tr>
                        <th className="titlle-box" colSpan="3">Adress</th>    
                    </tr>
                    <tr>
                        <td>Miasto</td>
                        <td>{status.adress.city}</td>
                    </tr>
                    <tr>
                        <td>Ulica i Numer</td>
                        <td>{status.adress.streaat} {status.adress.nr}</td>
                    </tr>
                    <tr>
                        <td>Kod Pocztowy</td>
                        <td>{status.adress.zipcode}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}