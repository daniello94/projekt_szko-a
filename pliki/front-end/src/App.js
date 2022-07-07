import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import StudentList from "./routes/StudentList";
import Login from "./routes/Login";
import UserData from "./routes/UserData";
import MyGrades from "./routes/MyGrades";
import StudentAdd from "./routes/StudentAdd";
import StudentData from "./routes/StudentData";
import AddGrades from "./routes/AddGrades";
import Chat from "./routes/Chat"
import axios from "axios";
import { PromiseProvider } from "mongoose";

export default function App() {
  const [userData, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  axios.defaults.headers.common["x-auth-token"] = userData ? userData.jwt : "";

  

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!userData) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };
  const logOut = () => {
    localStorage.clear();
    setInterval();
  };
  useEffect(() => {
    if (!userData) {
      // navigate("/login");
    }
  }, []);

  return (
    <div className="main-menu">
      <nav>
        <ul>
          {userData && userData.user.role === "teacher" && (
            <li>
              <Link className="ul-itm" to="/studentList">
                Lista Studentów
              </Link>
            </li>
          )}

          {!userData && (
            <li>
              <Link className="ul-itm" to="/">
                Logowanie
              </Link>
            </li>
          )}

          {userData && (
            <li>
              <Link className="ul-itm" to={`/userData/${userData.user._id}`}>
                Moje Dane
              </Link>
            </li>
          )}

          {userData  && userData.user.role === "student"  &&  (
            <li>
              <Link className="ul-itm" to={`/myGrades/${userData.user._id}`}>
                Moje Oceny
              </Link>
            </li>
          )}

             {userData && (
            <li>
              <Link className="ul-itm" to="/chat">
                Czat
              </Link>
            </li>
          )}

          {userData && (
            <li>
              <Link className="ul-itm" onClick={logOut} to="/">
                Wyloguj
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          index
          element={<Login userData={userData} setUser={setUser} />}
        />

        <Route
          path="studentList"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route path="userData/:id" element={<UserData />} />
        <Route path="/myGrades/:id" element={<MyGrades />} />
        <Route path="/studentAdd" element={<StudentAdd />} />
        <Route path="/studentData/:id" element={<StudentData />} />
        <Route path="/addGrades/:id" element={<AddGrades />} />
        <Route path="/chat" element={<Chat dataUser={userData} />} />
      </Routes>
    </div>
  );
}
