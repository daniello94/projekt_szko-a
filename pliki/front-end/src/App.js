import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./App.css"
import StudentList from "./routes/StudentList";
import Login from "./routes/Login";
import UserData from "./routes/UserData";
import MyGrades from "./routes/MyGrades";
import StudentAdd from "./routes/StudentAdd";
import StudentData from "./routes/StudentData"
export default function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const ProtectedRoute = ({ children }) => {

    const location = useLocation();

    if (!user) {
      return <Navigate to="/login" replace state={{ from: location }} />
    }
    return children
  }
  const logOut = () => {
    localStorage.clear();
    setInterval()
  }

  return (
    <div className="main-menu">
      <nav>
        <ul>
          {user && (
            <li>
              <Link className="ul-itm" to="/studentList">Lista Studentów</Link>
            </li>
          )}

          {!user && (
            <li>
              <Link className="ul-itm" to="/login">Logowanie</Link>
            </li>
          )}
          {user && (
            <li>
              <Link className="ul-itm" to="/userData">Moje Dane</Link>
            </li>
          )}
          {user && (
            <li>
              <Link className="ul-itm"  to="/myGrades">Moje Oceny</Link>
            </li>
          )}
          {user && (
             <li>
             <Link className="ul-itm" onClick={logOut} to="/login">Wyloguj</Link>
           </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="login" index element={<Login user={user} setUser={setUser} />} />

        <Route path="studentList" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
        <Route path="userData/:id" element={<UserData />} />
        <Route path="/myGrades" element={<MyGrades />} />
        <Route path="/studentAdd" element={<StudentAdd />} />
        <Route path="/studentData/:id" element={<StudentData />} />

      </Routes>
    </div>
  )
}
