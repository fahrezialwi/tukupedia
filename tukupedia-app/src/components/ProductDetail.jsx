import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import URL_API from '../configs/urlAPI'
import formatCurrency from '../helpers/formatCurrency'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productId: '',
            productName: '',
            productDescription: '',
            productPrice: '',
            productSeller: '',
            productRating: 0,
            productPicture: '',
            productQuantity: 1
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            URL_API + `products/${this.props.match.params.id}`
        ).then(res => {      
            this.setState({
                productId: res.data.results[0].id,
                productName: res.data.results[0].name,
                productDescription: res.data.results[0].description,
                productPrice: formatCurrency(res.data.results[0].price),
                productSeller: res.data.results[0].seller,
                productRating: res.data.results[0].rating,
                productPicture: res.data.results[0].picture
            })
        })
    }

    onAddToCartClick = () => {
        if (this.props.userId) {
            axios.get(
                URL_API + 'carts', {
                    params: {
                        product_id: this.state.productId,
                        user_id: this.props.userId
                    }
                }
            
            ).then(res => {
                if (res.data.results.length === 0) {
                    axios.post(
                        URL_API + 'carts', {
                            product_id: this.state.productId,
                            qty: this.state.productQuantity,
                            user_id: this.props.userId
                        }
                    ).then(res => {
                        Swal.fire({
                            type: 'success',
                            text: 'Product has been added to cart',
                            confirmButtonColor: '#28a745'
                        })
                    })
                } else {
                    let newQty = res.data.results[0].qty + this.state.productQuantity
    
                    axios.patch(
                        URL_API + `carts/${res.data.results[0].id}`, {
                            qty: newQty
                        }
                    ).then(res => {
                        Swal.fire({
                            type: 'success',
                            text: 'Product has been added to cart',
                            confirmButtonColor: '#28a745'
                        })
                    })
                }
            })
        } else {
            this.props.history.push("/login")
        }
    }

    onQtyAddClick = () => {
        this.setState({
            productQuantity: this.state.productQuantity + 1
        })
    }

    onQtySubtractClick = () => {
        if (this.state.productQuantity > 1) {
            this.setState({
                productQuantity: this.state.productQuantity - 1
            })
        }
    }

    render() {
        if (this.state.productId) {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
                        <div className="card col-5 mx-auto">
                            <div className="row">
                                <img src={this.state.productPicture} alt={this.state.productName} className="col-12"/>
                            </div>
                        </div>
                        <div className="col-7 product-data">
                        <h2>{this.state.productName}</h2>
                            <p><img src="../star-5.png" alt="rating" className="mr-2"/>{this.state.productRating}</p>
                            <h3 className="text-orange">{this.state.productPrice}</h3>
                            <p className="mt-5 mb-4">{this.state.productDescription}</p>
                            <div className="row">
                                <div className="col-3">
                                    <button onClick={this.onQtySubtractClick} className="btn btn-quantity">−</button>
                                    <div className="text-center input-quantity">{this.state.productQuantity}</div>
                                    <button onClick={this.onQtyAddClick} className="btn btn-quantity">+</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-orange" onClick={this.onAddToCartClick}>Add To Cart</button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
                        <h1 className="text-center">Loading</h1>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id
    }
}

export default connect(mapStateToProps)(ProductDetail)