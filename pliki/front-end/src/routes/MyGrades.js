import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

export default function MyGrades(_id) {
    let { id } = useParams()
    const [more, setMore] = useState("")
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        actions: []
    });

    function oneUser(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
                console.log(res.data);
            })
    };

    function mores(id) {
        setMore(id)
    }

    useEffect(() => {
        oneUser(id)
    }, [])
    console.log(status);
    if (more === status.id) {
        return (
            <div>
                <table className="myGreades">
                    <thead>
                        <tr>
                            <th colSpan="4">Oceny:{status.name} {status.lastName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="titlle-box" >
                            <td>Przedmiot</td>
                            <td>Typ</td>
                            <td>Dział</td>
                            <td>Ocena</td>
                        </tr>
                        {status.actions.map((actions) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {actions?.nameSubject}
                                        </td>
                                        <td>
                                            {actions?.genus}
                                        </td>
                                        <td>
                                            {actions?.titlleTask}
                                        </td>
                                        <td>
                                            {actions?.rating}
                                        </td>
                                    </tr>

                                    <tr className="titlle-box" >
                                        <td colSpan="4">Opis</td>
                                    </tr>
                                    <tr >{actions?.textarea}</tr>

                                </>
                            )
                        })}
                        <button className="btn" onClick={() => setMore("")}>Zamkinj</button>
                    </tbody>

                </table>
            </div>



        )
    }
    return (
        <div>
            <table className="myGreades">
                <thead>
                    <tr>
                        <th colSpan="4">Oceny:{status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="titlle-box" >
                        <td>Przedmiot</td>
                        <td>Typ</td>
                        <td>Dział</td>
                        <td>Ocena</td>
                    </tr>
                    {status.actions.map((actions) => {
                        return (
                            <>
                                <tr>
                                    <td>
                                        {actions?.nameSubject}
                                    </td>
                                    <td>
                                        {actions?.genus}
                                    </td>
                                    <td>
                                        {actions?.titlleTask}
                                    </td>
                                    <td>
                                        {actions?.rating}
                                    </td>
                                </tr>


                            </>
                        )
                    })}
                    <button className="btn" onClick={() => mores(status.id)}>Wyswetl opisy ocen</button>
                </tbody>

            </table>
        </div>
    )
}