import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: [],
            productPrice: 0
        }
    }

    componentDidMount() {
       
        axios.get(
            `http://localhost:2019/products/${this.props.match.params.id}`
        ).then((res) => {      
            this.setState({
                product: res.data
            })     

            let price = this.formatCurrency(this.state.product.price)
            this.setState({
                productPrice: price
            })  
        })
    }

    formatCurrency = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
    }

    productPrice = () => {
        return this.formatCurrency(this.state.product.price)
    }

    onAddToCartClick = () => {

        let idUser = this.props.id
        let name = this.state.product.name
        let description = this.state.product.description
        let price = this.state.product.price
        let picture = this.state.product.picture
        let idProduct =  this.state.product.id
        let quantity = parseInt(this.quantity.value)

        axios.get(
            'http://localhost:2019/carts',
            {
                params: {
                    user_id: this.props.id,
                    product_id: this.state.product.id
                }
            }
        
        ).then((res) => {

            if (res.data.length === 0){
                axios.post(
                    'http://localhost:2019/carts', 
                    {
                        user_id: idUser,
                        product_id: idProduct,
                        name: name,
                        description: description,
                        price: price,
                        picture: picture,
                        qty: quantity
                    }
                )
            } else {
                // res.data[0] = {id, user_id, product_id, ... , qty}
                let newQty = res.data[0].qty + quantity

                axios.patch(
                    `http://localhost:2019/carts/${res.data[0].id}`, 
                    {
                        qty: newQty
                    }
                )
            }
        })
        
        alert("Product has been added to cart")
    }

    render() {
        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className="container container-top">
                    <div className="row">
                        <div className="card col-5 mx-auto">
                            <div className="row">
                                <img src={this.state.product.picture} alt={this.state.product.name} className="col-12"/>
                            </div>
                        </div>
                        <div className="col-7 product-data">
                        <h2>{this.state.product.name}</h2>
                            <p><img src="../star-5.png" alt="rating" className="mr-2"/>{this.state.product.rating}</p>
                            <h3 className="text-orange">{this.state.productPrice}</h3>
                            <p className="mt-5 mb-4">{this.state.product.description}</p>
                            <div className="row">
                                <div className="col-2 qty-input">
                                    <input ref={(input) => {this.quantity = input}} className="form-control" type="number" min="1" placeholder="Jumlah"/>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-orange" onClick={()=> {this.onAddToCartClick()}}>Add To Cart</button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container container-top">
                    <h1 className="text-center">Loading</h1>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(ProductDetail)