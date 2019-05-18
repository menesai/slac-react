import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
import MetaPanel from './MetaPanel/MetaPanel';
import ColorPanel from './ColorPanel/ColorPanel';
import firebase from '../firebase'


class AppTwo extends Component {
  state={
    currUser: {},
    channelz: [],
    channelsRefz: firebase.database().ref('channels'),
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

        this.addListen()
    }

     addListen = () => {
        let loadedChannels =[];
        this.state.channelsRefz.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({channelz: loadedChannels})
            // console.log(loadedChannels)
        })
    }
  render(){
    // console.log(this.state.channelz)
    return (
      <Grid columns='equal' className='appTwo' style={{background: '#eee'}}>
        <ColorPanel currUser={this.state}/>
        <SidePanel currUser={this.state} channelz={this.state.channelz} channelsRefz={this.state.channelsRefz}/>
  
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
