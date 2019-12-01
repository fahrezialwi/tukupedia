import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onLoginUser } from '../actions'

class Login extends Component {
    
    onLoginSubmit = (e) => {
        e.preventDefault()
        this.props.onLoginUser(this.username.value,this.password.value)
    }

    render() {
        if (!this.props.username) {
            return (
                <div className="container">
                <div className="row login-top">
                    <div className="col-sm-8 col-md-4 mx-auto">
                        <div className="card-body">
                            <h2>Login</h2>
                            <form onSubmit={this.onLoginSubmit}>
                                <div className="input-group"><input ref={(input)=>{this.username = input}} type="text" className="form-control mt-3" placeholder="Username"/></div>
                                <div className="input-group"><input ref={(input)=>{this.password = input}} type="password" className="form-control mt-3" placeholder="Password"/></div>
                                <div className="text-center">
                                    <button className="btn btn-block btn-success mt-4" onClick={this.onLoginSubmit}>Login</button>
                                </div>
                            </form>
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

export default connect(mapStateToProps,{onLoginUser})(Login)