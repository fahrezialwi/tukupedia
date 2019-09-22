import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap'
import { connect } from 'react-redux'
import { onLogoutUser, searchKeyword } from '../actions'

class Header extends Component {

    constructor(props) {
      super(props)
      // this.toggle = this.toggle.bind(this)
      this.state = {
        isOpen: false
      }
    }

    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    onSearchSubmit = (e) => {
      e.preventDefault()
      this.props.searchKeyword(this.keyword.value)
      if (this.keyword.value){
        this.props.history.push("/searchresults")
      }
    }

    render() {
      if(!this.props.username){
        return (
          <div>
            <Navbar color="light" light expand="md" fixed="top">
              <div className="container">
                <Link className="navbar-brand" to="/">tukupedia</Link>
                 <form className="input-group input-search" onSubmit={this.onSearchSubmit}>
                    <input ref={(input)=>{this.keyword = input}} type="text" className="form-control" placeholder="Search product" id="search-input"/>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="search-button" onClick={this.onSearchSubmit}>Search</button>
                    </div>
                </form>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link mr-3 text-light-dark" to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='/login'>
                          <button className="btn btn-outline-success">Login</button>
                        </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
          </div>
        )
      } else {
        return (
          <div>
            <Navbar color="light" light expand="md" fixed="top">
              <div className="container">
                <Link className="navbar-brand" to="/">tukupedia</Link>
                <form className="input-group input-search" onSubmit={this.onSearchSubmit}>
                    <input ref={(input)=>{this.keyword = input}} type="text" className="form-control" placeholder="Search product" id="search-input"/>
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" id="search-button" onClick={this.onSearchSubmit}>Search</button>
                    </div>
                </form>
                <div className="ml-auto">
                  <Link className="fa fa-shopping-cart ml-4 mr-4 " aria-hidden="true" to="/cart"></Link>
                  <Link className="fa fa-archive mr-4 " aria-hidden="true" to="/manageproducts"></Link>
                </div>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="navbar-dropdown">
                      <div className="login-break d-inline-block">
                        {`Hello, ${this.props.username}`}
                      </div>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem className="text-light-dark">
                        <div className="font-weight-bold">{this.props.username}</div>
                        <div style={{fontSize: "14px"}}>({this.props.email})</div>
                      </DropdownItem>
                      <DropdownItem divider />
                      {/* Setelah dimasukkan ke connect, onLogoutUser dipanggil sebagai this.props.onLogoutUser */}
                      <DropdownItem className="text-light-dark" onClick={this.props.onLogoutUser}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </div>
            </Navbar>
          </div>
        )
      }
    }
}

// Function untuk mengambil data di redux state dan menjadikannya props
const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    email: state.auth.email,
    cartArray: state.cart
  }
}

export default withRouter(connect(mapStateToProps,{onLogoutUser, searchKeyword})(Header))