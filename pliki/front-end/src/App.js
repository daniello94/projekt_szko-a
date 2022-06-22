import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./App.css"
import StudentList from "./routes/StudentList";
import Login from "./routes/Login";
import Home from "./routes/Home";
import UserData from "./routes/UserData";
import MyGrades from "./routes/MyGrades";
import StudentAdd from "./routes/StudentAdd";
export default function App() {

  return (
    <div className="main-menu">
      <nav>
        <ul>
          <li>
            <Link className="ul-itm" to="/">Home</Link>
          </li>

          <li>
            <Link className="ul-itm" to="/studentList">Lista Studentów</Link>
          </li>

          <li>
            <Link className="ul-itm" to="/login">Logowanie</Link>
          </li>

          <li>
            <Link className="ul-itm" to="/userData">Moje Dane</Link>
          </li>
          <li>
            <Link className="ul-itm" to="/myGrades">Moje Oceny</Link>
          </li>

        </ul>
      </nav>

      <Routes>
        <Route path="studentList" element={<StudentList />} />
        <Route path="login" element={<Login />} />
        <Route path="studentList" element={<StudentList />} />
        <Route path="userData" element={<UserData />} />
        <Route path="/" element={<Home />} />
        <Route path="/myGrades" element={<MyGrades />} />
        <Route path="/studentAdd" element={<StudentAdd/>} />

      </Routes>
    </div>
  )
}
