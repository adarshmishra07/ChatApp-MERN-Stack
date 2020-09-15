import React,{Component} from "react";
import {Link} from 'react-router-dom'
import arrow from "../images/arrow-left.svg";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addContact} from '../actions/profileAction'

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      friend: "",      
      message: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const con = {
      friend : this.state.friend
    }       
    this.props.addContact(con);
    this.setState({friend: ''})
  }

  render(){
  return (
    <div id="register">
      <div className="container">
        <div className="row">
          <Link className="back" to='/'>
            <img src={arrow} alt="" />
          </Link>
          <div className="nameblock">Add Contact</div>
        </div>
        <div className="logo">Messenger</div>
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            name="friend"
            placeholder="Enter Email Address"
            required
            onChange={this.onChange}
            value={this.state.friend}
          />
          <br />
          <input type="submit" value="Submit" name="submit" />
        </form>
      </div>
    </div>
  );
  }
}
AddUser.propTypes = {
  addContact: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});

export default connect(mapStateToProps,{addContact})(AddUser);
