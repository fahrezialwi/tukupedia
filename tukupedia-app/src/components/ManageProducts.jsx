import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import URL_API from '../configs/urlAPI'
import formatCurrency from '../helpers/formatCurrency'

class ManageProducts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            selectedId: 0,
            selectedName: '',
            selectedDescription: '',
            selectedPrice: '',
            selectedPicture: ''
        }
    }

    componentDidMount() {
         this.getData()
    }

    getData = () => {
        if (this.props.role === 'admin') {
            axios.get(
                URL_API + 'products'
            ).then((res) => {
                this.setState({
                    products: res.data.results, 
                    selectedId: 0
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    onAddClick = () => {
        if (this.name.value && this.desc.value && this.price.value && 
            this.seller.value && this.rating.value && this.pict.value
        ) {
            axios.post(
                URL_API + 'products', {
                    name: this.name.value,
                    description: this.desc.value,
                    price: parseInt(this.price.value),
                    seller: this.seller.value,
                    rating: parseFloat(this.rating.value),
                    picture: this.pict.value
                }
            ).then(res => {
                this.getData()
                this.name.value = ''
                this.desc.value = ''
                this.price.value = ''
                this.seller.value = ''
                this.rating.value = ''
                this.pict.value = ''

                Swal.fire({
                    type: 'success',
                    text: 'Product has been successfully added',
                    confirmButtonColor: '#28a745'
                })
            }).catch((err) => {
                console.log(err)
            })
        } else {
            Swal.fire({
                type: 'error',
                text: 'Please check your data',
                confirmButtonColor: '#28a745'
            })
        }
    }

    onEditClick = (id, product) => {
        this.setState({
            selectedId: id,
            selectedName: product.name,
            selectedDescription: product.description,
            selectedPrice: product.price,
            selectedSeller: product.seller,
            selectedRating: product.rating,
            selectedPicture: product.picture
        })
    }

    onDeleteClick = (id) => {
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
                axios.delete(
                    URL_API + `products/${id}`

                ).then((res) => {
                    this.getData()
                }).catch((err) => {
                    console.log(err)
                })
                
                Swal.fire({
                    type: 'success',
                    text: 'Delete successful',
                    confirmButtonColor: '#28a745'
                })
            }
        })
    }
    
    onSaveClick = () => {
        axios.patch(
            URL_API + `products/${this.state.selectedId}`, {
                name: this.state.selectedName,
                description: this.state.selectedDescription,
                price: parseInt(this.state.selectedPrice),
                seller: this.state.selectedSeller,
                rating: parseFloat(this.state.selectedRating),
                picture: this.state.selectedPicture
            }
        ).then(res => {
            this.getData()
            Swal.fire({
                type: 'success',
                text: 'Edit successful',
                confirmButtonColor: '#28a745'
            })
        }).catch(err => {
            console.log(err)
        })
    }

    onCancelClick = () => {
        this.setState({
            selectedId: 0
        })
    }

    productList = () => {
        let hasilRender = this.state.products.map((product)=>{
            if (product.id !== this.state.selectedId) {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{product.seller}</td>
                        <td>{product.rating}</td>
                        <td>
                            <img 
                                src={product.picture} 
                                alt={product.name}
                                style={{width: "100px"}} 
                            />
                        </td>
                        <td>
                            <button 
                                className="btn btn-success btn-block mb-1"
                                onClick={() => {this.onEditClick(product.id, product)}}
                                >
                                Edit
                            </button>
                            <button 
                                className="btn btn-outline-success btn-block"
                                onClick={() => {this.onDeleteClick(product.id)}}
                                >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={product.id}>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control" 
                                value={this.state.selectedName} 
                                onChange = {(e) => this.setState({selectedName: e.target.value})}
                            />
                        </td>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control"
                                value={this.state.selectedDescription} 
                                onChange = {(e) => this.setState({selectedDescription: e.target.value})}
                            />
                            </td>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control" 
                                value={this.state.selectedPrice} 
                                onChange = {(e) => this.setState({selectedPrice: e.target.value})}
                            />
                        </td>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control" 
                                value={this.state.selectedSeller} 
                                onChange = {(e) => this.setState({selectedSeller: e.target.value})}
                            />
                        </td>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control" 
                                value={this.state.selectedRating} 
                                onChange = {(e) => this.setState({selectedRating: e.target.value})}
                            />
                        </td>
                        <td>
                            <textarea
                                rows={4}
                                className="form-control" 
                                value={this.state.selectedPicture}
                                onChange = {(e) => this.setState({selectedPicture: e.target.value})}
                            />
                        </td>
                        <td>
                            <button
                                className='btn btn-success btn-block mb-1' 
                                onClick = {this.onSaveClick}
                            >
                                Save
                            </button>
                      
                            <button 
                                className='btn btn-outline-success btn-block' 
                                onClick = {this.onCancelClick}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                )
            }
        })
        return hasilRender
    }

    render() {
        if (this.props.role === 'admin') {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
                        <h1 className="text-center">Add Product</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>SELLER</th>
                                    <th>RATING</th>
                                    <th>PICTURE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><textarea ref={(input) => {this.name = input}} className="form-control" rows={2}/></td>
                                    <td><textarea ref={(input) => {this.desc = input}} className="form-control" rows={2}/></td>
                                    <td><textarea ref={(input) => {this.price = input}} className="form-control" rows={2}/></td>
                                    <td><textarea ref={(input) => {this.seller = input}} className="form-control" rows={2}/></td>
                                    <td><textarea ref={(input) => {this.rating = input}} className="form-control" rows={2}/></td>
                                    <td><textarea ref={(input) => {this.pict = input}} className="form-control" rows={2}/></td>
                                    <td><button className="btn btn-success btn-block" onClick={this.onAddClick}>Add</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row row-bottom">
                        <h1 className="text-center">Product List</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>SELLER</th>
                                    <th>RATING</th>
                                    <th>PICTURE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.productList()}
                            </tbody>
                        </table>
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
        role: state.auth.role
    }
}

export default connect(mapStateToProps)(ManageProducts)