import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import plus from '../../images/user-plus.svg'
import PropTypes from 'prop-types'
import {connect} from  'react-redux'
import {logoutUser} from '../../actions/authActions'
import {clearProfile} from '../../actions/profileAction'

class Header extends Component {
    onLogoutClick(e){
      e.preventDefault()
      this.props.clearProfile()
      this.props.logoutUser()
    }
    render(){
    return (
        <div className="header">
            <nav>
                <div className="logo">Messenger</div>
                <div className="group">
                    <div className="add"><Link to="/adduser"><img src={plus} alt=""/></Link></div>
                    <div className="logout"><div onClick={this.onLogoutClick.bind(this)} >Logout</div></div>
                </div>
            </nav>
        </div>
    )
    }
}

Header.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    auth  : PropTypes.object.isRequired
  }
  
  const mapStateToProps = state=>({
    auth: state.auth
  })
  
  export default connect(mapStateToProps,{logoutUser,clearProfile})(Header);
