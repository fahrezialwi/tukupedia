import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import URL_API from '../configs/urlAPI'
import formatCurrency from '../helpers/formatCurrency'

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
        if (this.props.userId) {
            axios.get(
                URL_API + 'carts',
                {
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
    }

    onDeleteProduct = (index, cartId) => {
        Swal.fire({
            text: "Delete this product?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            customClass: {
                confirmButton: 'btn btn-success mr-3 pl-4 pr-4',
                cancelButton: 'btn btn-outline-success pl-4 pr-4'
              },
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                let array = this.state.carts
                array.splice(index,1)
                this.setState({carts: array})
    
                axios.delete(
                    URL_API + `carts/${cartId}`
                )
                
                Swal.fire({
                    type: 'success',
                    text: 'Delete successful',
                    confirmButtonColor: '#28a745'
                })
            }
        })
    }

    cartList = () => {
        return this.state.carts.map((cart, index)=>{
            return (
                <tr key={cart.id}>
                    <td>{cart.product_id}</td>
                    <td>{cart.name}</td>
                    <td>{cart.description}</td>
                    <td>{formatCurrency(cart.price)}</td>
                    <td>{cart.qty}</td>
                    <td><img src={cart.picture} alt={cart.name} width="100"/></td>
                    <td><button type="button" className="btn btn-success" onClick={()=>{this.onDeleteProduct(index, cart.id)}}>Delete</button></td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.userId) {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
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
                        <div className="col-12 text-center">
                            <Link to='/checkout'>
                                <button type="button" className="btn btn-success">Checkout</button>
                            </Link>
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
        userId: state.auth.id,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Cart)