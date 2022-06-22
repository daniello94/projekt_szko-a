import React from "react";
import {Link} from "react-router-dom"
import './style/List.css'

export default function List(props) {
    let dataStudent = props.dataStudents;
    let element = dataStudent.map((student)=> {
        return(
            <tr key={student._id}>
                <td className="box">{student.name}</td>
                <td className="box">{student.lastName}</td>
                <td className="box">{student.classNr}</td>
                <td className="box">{student.email}</td>
                <td className="box">
                    <button className="btn">Wiecej informacji</button>
                    {/* <button className="btn">Usuń ucznia</button> */}
                </td>
            </tr>

        )
    })
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th colSpan="5">Lista uczniów</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="titlle-box">
                        <td>Imię</td>
                        <td>Nazwisko</td>
                        <td>Klasa</td>
                        <td>Email</td>
                        <td>Akcje</td>
                    </tr>
                    {element}
                </tbody>
            </table>
           <Link className="btn" to="/studentAdd">Dodaj ucznia</Link>
        </div>

    )
}