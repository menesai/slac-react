import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
import MetaPanel from './MetaPanel/MetaPanel';
import ColorPanel from './ColorPanel/ColorPanel';
import firebase from '../firebase'


class AppTwo extends Component {
  state={
    currUser: {}
  }

     componentDidMount(){
        firebase
        .auth()
        .onAuthStateChanged(user => {
            if(!user){
                this.props.history.push('/login');
            } else {
                // return null
                this.setState({currUser: user})
            }
        })
    }
  render(){
    // console.log(firebase.
    return (
      <Grid columns='equal' className='appTwo' style={{background: '#eee'}}>
        <ColorPanel currUser={this.state}/>
        <SidePanel currUser={this.state}/>
  
        <Grid.Column style={{marginLeft: 320}}>
        <Messages currUser={this.state}/>
        </Grid.Column>
  
        <Grid.Column style={{width: 4}}>
        <MetaPanel currUser={this.state}/>
        </Grid.Column>
      </Grid>
    )
  }
  }

export default AppTwo
