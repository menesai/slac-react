import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Channels from './Channels'

export class SidePanel extends Component {
  render() {
    //   console.log(this.props.currUser)
    return (
     <Menu size='large' inverted fixed='left' vertical style={{background: '#4c3c4c', fontSize: '1.2rem'}}>
        <UserPanel currUser={this.props}/>
        <Channels currUser={this.props.currUser}/>
     </Menu>
    )
  }
}

export default SidePanel
