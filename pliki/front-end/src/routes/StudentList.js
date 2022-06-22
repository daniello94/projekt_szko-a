import React, { Component } from "react";
import axios from "axios";
import List from "./List"

class StudentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataStudent: []
        }
    };
    componentDidMount = () => {
        this.listStudents();
    };
    listStudents = () => {
        axios.post('http://127.0.0.1:8080/api/user/all')
            .then(res => {
                this.setState({
                    dataStudent: res.data
                    
                })
            })
    };
    render() {
        return (
            <div>
               <List dataStudents={this.state.dataStudent}/>
            </div>
        )
    }
}
export default StudentList