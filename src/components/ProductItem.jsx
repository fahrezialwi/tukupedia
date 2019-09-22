import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProductItem extends Component {
    render() {
        let {id, name, price, picture, seller, rating} = this.props.product
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 list-padding" key={id}>
                 <Link to={`/productdetail/${id}`}>
                    <div className="card card-decoration p-3 mb-3">
                        <img src={picture} alt={name} className="card-img-top mb-3"/>
                        <h6 className="card-title word-break mb-0">{name}</h6>
                        <p className="card-text text-orange mb-0">Rp. {price}</p>
                        <p className="mb-1">{seller}</p>
                        <p className="mb-0"><img src="./star-5.png" alt="rating" className="mr-1"/>{rating}</p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ProductItem