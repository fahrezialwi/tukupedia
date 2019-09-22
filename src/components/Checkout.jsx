import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            carts: []
        }
    }

    componentDidMount() {
        this.getCartData()
    }

    getCartData = () => {
        axios.get(
            'http://localhost:2019/carts',
            {
                params: {
                    user_id: this.props.id
                }
            }
        ).then((res) => {
            this.setState({carts: res.data}) 
        })
    }

    checkoutBody = () => {
        return this.state.carts.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>   
                    <td>{this.formatCurrency(cart.price)}</td>
                    <td>{cart.qty}</td>
                    <td>{this.formatCurrency(cart.qty * cart.price)}</td>
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
                <th>{this.formatCurrency(total)}</th>
            </tr>
        )
    }

    formatCurrency = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
    }

    render() {
        if (this.props.username){
        return (
            <div className="container container-top">
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
        )
        } else {
            return <Redirect to='/login'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(Checkout)