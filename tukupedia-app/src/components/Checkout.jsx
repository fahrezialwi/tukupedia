import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import URL_API from '../configs/urlAPI'
import formatCurrency from '../helpers/formatCurrency'

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            carts: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + 'carts', {
                params: {
                    user_id: this.props.userId
                }
            }
        ).then((res) => {
            this.setState({
                carts: res.data.results
            }) 
        })
    }

    checkoutBody = () => {
        return this.state.carts.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>   
                    <td>{formatCurrency(cart.price)}</td>
                    <td>{cart.qty}</td>
                    <td>{formatCurrency(cart.qty * cart.price)}</td>
                </tr>
            )
        })
    }

    checkoutTotal = () => {
        let total = 0
        this.state.carts.forEach((cart) => {
            total += (cart.qty * cart.price)
        })
        return (
            <tr>
                <th colSpan='4'>TOTAL</th>
                <th>{formatCurrency(total)}</th>
            </tr>
        )
    }

    render() {
        if (this.props.username) {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
                        <h1>Checkout</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>QTY</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.checkoutBody()} 
                                {this.checkoutTotal()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        userId: state.auth.id
    }
}

export default connect(mapStateToProps)(Checkout)