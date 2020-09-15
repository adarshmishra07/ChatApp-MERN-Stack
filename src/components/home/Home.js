import React, { Component } from 'react'
import Header from './Header'
import Body from './Body'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profileAction'

class Home extends Component {
    
    componentDidMount(){
        this.props.getCurrentProfile()
    }
    render(){
    let  {profile ,loading}  = this.props.profile;
    let homeContent;
    if(profile === null || loading){
      homeContent=<div className="loading">Loading</div>
    }else{
      homeContent= (<>
        <Header />
        <Body profile={profile} loading={loading}/></>)      
    }
    
    return (
        <div id="home">
        {homeContent}
        </div>
    )
    }
}

Home.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
export default connect(mapStateToProps,{getCurrentProfile})(Home)
