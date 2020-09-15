import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginUser } from '../../actions/authActions'
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor() {
      super();
      this.state = {
        facebookId: "",
        googleId: "",
        email: "",
        password: "",
        errors: {},
      };
  
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    componentDidMount(){
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/')
      }
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/");
      }
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
      e.preventDefault();
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(userData);
    }
    render(){
    return (
        <div id="register">
            <div className="container">
                <div className="logo">Messenger</div>
                <div className="text">LOG IN</div>
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="Enter Your Email Address" onChange={this.onChange} value={this.state.email} required/>
                    <input type="password" name="password" onChange={this.onChange}
                    placeholder="Password"
                    value={this.state.password} required/><br/>
                    <input type="submit" value="Login" name="login"/>
                </form>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps, { loginUser })(Login);
