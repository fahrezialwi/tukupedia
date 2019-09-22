import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {

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
            'http://localhost:2019/carts',
            {
                params: {
                    user_id: this.props.id
                }
            }
        ).then((res) => {
            this.setState({
                carts: res.data
            })
        })
    }

    onDeleteProduct = (index, cartId) => {
         
        if (window.confirm("Are you sure?")){

            // patch data di array cart utama
            let array = this.state.carts
            array.splice(index,1)
            this.setState({carts: array})

            axios.delete(
                `http://localhost:2019/carts/${cartId}`
            )
        }
    }

    formatCurrency = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
    }

    cartList = () => {
        return this.state.carts.map((cart, index)=>{
            return (
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>
                    <td>{cart.description}</td>
                    <td>{this.formatCurrency(cart.price)}</td>
                    <td>{cart.qty}</td>
                    <td><img src={cart.picture} alt={cart.name} width="100"/></td>
                    <td><button type="button" className="btn btn-success" onClick={()=>{this.onDeleteProduct(index, cart.id)}}>Delete</button></td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.username){
            return (
                <div className="container container-top mb-5">
                <h1>Cart</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>DESCRIPTION</th>
                                <th>PRICE</th>
                                <th>QTY</th>
                                <th>PICTURE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.cartList()}  
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Link to='/checkout'>
                            <button type="button" className="btn btn-success">Checkout</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/login'/>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Cart)