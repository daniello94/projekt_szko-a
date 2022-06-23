import React from "react";
import { useParams } from "react-router-dom"
export default function UserData(_id){
    let {id} =useParams()
    return(
        <div>
            <h1> Tutaj bedzie strona Moje dane {id}</h1>
        </div>
    )
}