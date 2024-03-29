import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import URL_API from '../configs/urlAPI'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: '',
            error: '',
            success: ''
        }
    }

    onRegisterSubmit = (e) => {
        e.preventDefault()

        this.setState({loading: true})

        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        
        axios.get(
            URL_API + 'users', 
            {
                params: {
                    username: username
                }
            }
        ).then((res) => {
            if (res.data.length > 0) {
                this.setState({loading: false, error:'Username has already been used'})

                setTimeout(() => { 
                    this.setState({error: ''}) 
                }, 3000)
            } else {
                axios.get(
                    URL_API + 'users', 
                    {
                        params: {
                            email: email
                        }
                    }
                ).then((res) => {
                    if (res.data.length > 0) {
                        this.setState({loading: false, error:'Email address has already been used'})

                        setTimeout(() => { 
                            this.setState({error: ''}) 
                        }, 3000)
                    } else {
                        axios.post(
                            URL_API + 'users', 
                            {
                                username: username,
                                email: email,
                                password: password
                            }
                        ).then(() => {
                            this.setState({loading: false, success:'Registration successful'})

                            setTimeout(() => { 
                                this.props.history.push("/login")
                            }, 3000) 
                        })
                    }
                })
            }
        })
    }

    loadingButton = () => {
        if (this.state.loading) {
            return (
                <div className='spinner-grow' role='status'>
                    <span className='sr-only'></span>
                </div>
            )
        }

        return (
            <button 
                className='btn-block btn btn-success mt-4'
                onClick={this.onRegisterSubmit}
            >
                Register
            </button>
        )

    }

    notification = () => {
        if (this.state.error) {
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.error}
                </div>
            )

        } else if (this.state.success) {
            return (
                <div className='alert alert-success mt-4'>
                    {this.state.success}
                </div>
            )

        } else {
            return null
        }
    }

    render() {
        if (!this.props.username) {
            return (
                <div className="container">
                    <div className="row login-top">
                        <div className="col-sm-8 col-md-4 mx-auto">
                            <div className="card-body">
                                <h2>Register</h2>
                                <form onClick={this.loadingButton}>
                                    <div className="input-group"><input ref={(input)=>{this.username = input}} type="text" className="form-control mt-3" placeholder="Username"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.email = input}} type="email" className="form-control mt-3" placeholder="Email"/></div>
                                    <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                    {this.loadingButton()}
                                </form>
                                {this.notification()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default withRouter(connect(mapStateToProps)(Register))