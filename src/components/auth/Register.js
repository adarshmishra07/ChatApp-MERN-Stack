import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {registerUser } from '../../actions/authActions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor() {
      super();
      this.state = {
        isLoggedIn: false,
        name: "",
        email: "",
        password: "",
        password2: "",
        errors:{}
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/')
      }
    }
    
    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors : nextProps.errors})
      } 
    }
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
      e.preventDefault();
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      };
  
      this.props.registerUser(newUser,this.props.history) 
    }

    render(){
    return (
        <div id="register">
            <div className="container">
                <div className="logo">Messenger</div>
                <div className="text">To start using Messenger please register with your Email Id</div>
                <form onSubmit={this.onSubmit} >
                    <input type="name" name="name"  placeholder="Enter Your Name" onChange={this.onChange}
                    value={this.state.name} required/>
                    <input type="email" name="email" placeholder="Enter Your Email Address" onChange={this.onChange}
                    value={this.state.email} required/>
                    <input type="password" name="password" placeholder="Create Password" onChange={this.onChange}
                    value={this.state.password} required/>
                    <input type="password" name="password2" placeholder="Confirm Password" onChange={this.onChange}
                    value={this.state.password2}required/><br/>
                    <input type="submit" value="Register" name="submit"/>
                </form>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    )
    }
}

Register.propTypes = {
    registerUser  : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    auth : state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps,{registerUser})(withRouter(Register));