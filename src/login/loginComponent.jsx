import React, { Component } from 'react'
import { connect } from "react-redux";
import "./loginComponent.css";
import { login } from "../actions/login.action"

const mapStateToProps = state => ({
    loginData: state.login,
});

class loginComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            userNameError: "",
            passwordError: ""
        }
    }

    componentDidUpdate() {
        if (this.props.loginData.isLoggedIn === true) {
            sessionStorage.setItem("loggedIn", 'true')
            this.props.history.push('/search-page')
        }
    }


    validate = (name, value) => {
        let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        let regexPassword = /(?=.*[0-9])(?=.*[a-z]).{6,15}$/i;

        switch (name) {
            case "email":
                if (value === "" || value === undefined) {
                    this.setState({
                        userNameError: "Required"
                    })
                } else if (!regexEmail.test(value)) {
                    this.setState({
                        userNameError: "Please enter valid email"
                    })
                } else {
                    this.setState({
                        userNameError: ""
                    })
                }
                break;
            case "password":
                if (value === "" || value === undefined) {
                    this.setState({
                        passwordError: "Required"
                    })
                } else if (!regexPassword.test(value)) {
                    this.setState({
                        passwordError: `Invalid password. Password should contain minimum of 6 characters including 1 small letter and 1 number.`
                    })
                } else {
                    this.setState({
                        passwordError: ""
                    })
                }
                break;
            default:
        }
    };

    handleInput = (event) => {
        this.setState({
            userName: event.target.value
        })
        this.validate('email', event.target.value)

    }

    handleInputPasword = (event) => {
        this.setState({
            password: event.target.value
        })
        this.validate('password', event.target.value)
    }

    handleSubmit = () => {
        const { userName, password } = this.state;

        const userDetails = {
            userName: userName,
            password: password
        }

        this.props.login(userDetails)

        if(this.state.userName !=="bhaskar@gmail.com" && this.state.password !=="bhaskar123"){
            this.setState({
                userNameError:"Incorrect Credentials",
                passwordError:"Incorrect Credentials"
            })
        }
    }



    render() {
        return (
            <div className="container-login">
                <label>User Name :</label> <input type="email" placeholder="User Name" onChange={this.handleInput} />
                <p>{this.state.userNameError}</p>
                <br />
                <label>Password :</label> <input type="password" placeholder="Password" onChange={this.handleInputPasword} />
                <p>{this.state.passwordError}</p>
                <br />
                <button className="button-login" onClick={this.handleSubmit}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: values => dispatch(login(values))
});


export default connect(mapStateToProps, mapDispatchToProps)(loginComponent)  
