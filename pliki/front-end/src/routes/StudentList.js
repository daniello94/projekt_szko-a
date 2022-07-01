import React, { Component } from "react";
import axios from "axios";
import List from "./List"

class StudentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataStudent: [],
            group:''
        }
    };
    componentDidMount = () => {
        this.listStudents();
    };
    listStudents = () => {
        axios.post('http://127.0.0.1:8080/api/user/all?group=' + this.state.group)
            .then(res => {
                this.setState({
                    dataStudent: res.data
                    
                })
            })
    };
    render() {
        return (
            <div className="div-list">
                  <select className="select-class" onChange={(e)=>{
                    this.setState({group: e.target.value}, ()=>{
                        this.listStudents();
                    })
                }}>
                    <option value="">Wszyscy </option>
                    <option value="2a">Klasa 2a</option>
                    <option value="3a">Klasa 3a</option>
                </select>
               <List dataStudents={this.state.dataStudent} dataStudent={this.listStudents}/>
            </div>
        )
    }
}
export default StudentList