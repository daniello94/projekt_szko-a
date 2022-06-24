import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function UserData(_id) {

    let { id } = useParams()

    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        classNr: "",
        pesel: "",
        nameMather: "",
        nameFather: "",
        email: "",
        role: "",
        adress: {
            city: "",
            streaat: "",
            nr: "",
            zipcode: ""
        }
    });

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [classNr, setClassNr] = useState("");
    const [pesel, setPesel] = useState("");
    const [nameMather, setNameMather] = useState("");
    const [nameFather, setNameFather] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [streaat, setStreaat] = useState("");
    const [nr, setNr] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [upodate, setUpodate] = useState("");

    function editClick(id) {
        setUpodate(id)
    };

    function upodateUser(_id) {
        axios.put('http://127.0.0.1:8080/api/user/upodate/' + id, {
            name, lastName, classNr, pesel, nameMather, nameFather, email,
            adress: {
                city, streaat, nr, zipcode
            }
        })
        .then(()=>{
            setUpodate("")
            oneUser(_id)
        })
    }


    function oneUser(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    };

    useEffect(() => {
        oneUser(id)
    }, [])

    if (upodate === status.id) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name"></input>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Pesel</td>
                            <td><input type="text" value={pesel} onChange={(e) => setPesel(e.target.value)} name="pesel"></input></td>
                        </tr>
                        <tr>
                            <td>Imie Matki</td>
                            <td><input type="text" value={nameMather} onChange={(e) => setNameMather(e.target.value)} name="nameMather"></input></td>
                        </tr>
                        <tr>
                            <td>Imie Ojca</td>
                            <td><input type="text" value={nameFather} onChange={(e) => setNameFather(e.target.value)} name="nameFather"></input></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email"></input></td>
                        </tr>
                        <tr>
                            <td>Klasa</td>
                            <td><input type="text" value={classNr} onChange={(e) => setClassNr(e.target.value)} name="classNr"></input></td>
                        </tr>
                        <tr>
                            <td>Typ konta</td>
                            <td>{status.role}</td>
                        </tr>
                        <tr>
                            <th className="titlle-box" colSpan="2">Adress</th>
                        </tr>

                        <tr>
                            <td>Miasto</td>
                            <td><input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city"></input></td>
                        </tr>
                        <tr>
                            <td>Ulica i Numer</td>
                            <td>
                                <input type="text" value={streaat} onChange={(e) => setStreaat(e.target.value)} name="streaat"></input>
                                <input type="text" value={nr} onChange={(e) => setNr(e.target.value)} name="nr"></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Kod Pocztowy</td>
                            <td>
                                <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} name="zipcode"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-2" onClick={()=>upodateUser(status._id)}>Zapisz</button>
                <button className="btn btn-2" onClick={()=>setUpodate("")}>Anuluj</button>

            </div>
        )
    };
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">{status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
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
                        <td>Klasa</td>
                        <td>{status.classNr}</td>
                    </tr>
                    <tr>
                        <td>Typ konta</td>
                        <td>{status.role}</td>
                    </tr>
                    <tr>
                        <th className="titlle-box" colSpan="2">Adress</th>
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
            <button className="btn btn-2" onClick={()=>{
                setName(status.name)
                setLastName(status.lastName)
                setClassNr(status.classNr)
                setPesel(status.pesel)
                setNameMather(status.nameMather)
                setNameFather(status.nameFather)
                setEmail(status.email)
                setCity(status.adress.city)
                setStreaat(status.adress.streaat)
                setNr(status.adress.nr)
                setZipcode(status.adress.zipcode)
                editClick(status.id)
            }}>Edytuj dane</button>
        </div>
    )
}