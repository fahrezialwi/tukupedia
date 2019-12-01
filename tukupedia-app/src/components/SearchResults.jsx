import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import URL_API from '../configs/urlAPI'

class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            processedProducts: [],
            minValue: '',
            maxValue: ''

        }
    }
    
    componentDidMount() {
        this._isMounted = true
        axios.get(
            URL_API + 'products'
        ).then((res) => {
            if (this._isMounted) {
                this.setState({
                    products: res.data.results,
                    processedProducts: res.data.results
                })
            }
        })
    }

    _isMounted = false

    componentWillUnmount() {
        this._isMounted = false
    }    

    onFilterMin = (e) => {
        const number = (e.target.validity.valid) ? e.target.value : this.state.minValue;
        this.setState({minValue: number})
    }

    onFilterMax = (e) => {
        const number = (e.target.validity.valid) ? e.target.value : this.state.maxValue;
        this.setState({maxValue: number})
    }

    // Filter
    onFilterBlur = (e) => {
        e.preventDefault()
        this.setState({processedProducts: this.setState.products})

        let min = parseInt(this.minimum.value)
        let max = parseInt(this.maximum.value)

        if (isNaN(min)) {
            min = 0
        }

        if (isNaN(max)) {
            max = Infinity
        }

        let hasilFilter = this.state.products.filter((product) => {
                return (min <= product.price && max >= product.price)   
        })
        this.setState({processedProducts: hasilFilter})
    }

    // Sort
    onSelectChange = (e) => {
        let hasilSort
        if (e.target.value === "name") {
            hasilSort = this.state.processedProducts.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            })
        } else if (e.target.value === "lowest") {
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return a.price - b.price
            })
        } else if (e.target.value === "highest") {
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return b.price - a.price
            })
        } else if (e.target.value === "rating") {
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return b.rating - a.rating
            })
        } else if (e.target.value === "relevance") {
            hasilSort = this.state.processedProducts.sort((a, b) => {
                return a.id - b.id
            })
        }
        this.setState({processedProducts: hasilSort})
    }

    productList = () => {

        let name = this.props.keyword
        let hasilSearch = this.state.processedProducts.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase()) 
        })

        return hasilSearch.map((product) => {
            return <ProductItem product={product} key={product.id}/>
        })   
    }
    
    render() {
        if (this.props.keyword) {
            return (
                <div className="container">
                    <div className="row row-top row-bottom">
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="card filter-position p-3">
                                <div className="border-bottom card-title mb-3">
                                    <h5>Filter Product</h5>
                                </div>
                                <form onBlur={this.onFilterBlur}>
                                    <h6>Price</h6>
                                    <input ref={(input) => {this.minimum = input}} className="form-control mb-2" placeholder="Minimum" pattern="[0-9]*" onChange={this.onFilterMin} value={this.state.minValue} />
                                    <input ref={(input) => {this.maximum = input}} className="form-control mb-2" placeholder="Maximum" pattern="[0-9]*" onChange={this.onFilterMax} value={this.state.maxValue} />
                                </form>
                            </div>
                        </div>
                        
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="text-right mb-3">
                                Sort by
                                <select className="ml-3" onChange = {this.onSelectChange}>
                                    <option value="relevance">Relevance</option>
                                    <option value="name">Name</option>
                                    <option value="lowest">Lowest Price</option>
                                    <option value="highest">Highest Price</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>
                            <div className="row row-list">
                                {this.productList()}
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
        keyword: state.search.keyword
    }
}

export default connect(mapStateToProps)(SearchResults)