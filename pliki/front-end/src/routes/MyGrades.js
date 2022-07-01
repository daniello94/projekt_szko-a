import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

export default function MyGrades(_id) {
    let { id } = useParams()
    const [more, setMore] = useState(false)
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        grades: []
    });

    function oneUser(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)

            })
    };

    useEffect(() => {
        oneUser(id)
    }, [])

    return (
        <div>
            <table className="myGreades">
                <thead>
                    <tr>
                        <th colSpan="4">Oceny:{status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="title-box" >
                        <td>Przedmiot</td>
                        <td>Typ</td>
                        <td>Dział</td>
                        <td>Ocena</td>
                    </tr>
                    {status.grades.map((grades) => {
                        return (
                            <>
                                <tr>
                                    <td>
                                        {grades?.nameSubject}
                                    </td>
                                    <td>
                                        {grades?.genus}
                                    </td>
                                    <td>
                                        {grades?.titleTask}
                                    </td>
                                    <td>
                                        {grades?.rating}
                                    </td>
                                </tr>
                                <tr>
                                    {more && <td colSpan="4">{grades?.textarea}</td>}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <button className="btn" onClick={() => setMore(!more)}>{more ? "Ukryj opisy" : "Wyswetl opisy"}</button>
        </div>
    )
}