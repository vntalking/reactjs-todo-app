import React from "react";
import Todos from "./Todos";
import Header from "../components/layout/Header";
import AddTodo from "./AddTodo"

//khai bao thu vien axios
import axios from "axios";

class TodoApp extends React.Component {
    state = {
        todos: []
    };
    handleCheckboxChange = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };
    deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(reponse => this.setState({
                todos: [
                    ...this.state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }))
    };

    addTodo = title => {
        const todoData = {
            title: title,
            completed: false
        }
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
            .then(response => {
                console.log(response.data)
                this.setState({
                    todos: [...this.state.todos, response.data]
                })
            });
    };


    componentDidMount() {
        const config = {
            params: {
                _limit: 5
            }

        }
        //tao GET request de lay danh sach todos
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then(response => this.setState({ todos: response.data }));
    }

    render() {
        return (
            <div className="container">
                <Header />
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos}
                    handleChange={this.handleCheckboxChange}
                    deleteTodo={this.deleteTodo} />
            </div>
        );
    }
}
export default TodoApp;