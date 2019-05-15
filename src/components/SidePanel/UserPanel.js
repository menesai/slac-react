import React, { Component } from 'react'
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react';
import firebase from '../../firebase';
// import {connect} from 'react-redux'
// import reducer from '../../ducks/reducer'
// import { stat } from 'fs';
// import {setUser} from '../../ducks/reducer';
 
class UserPanel extends Component {
    state={
        hold: {}
    }
    dropdownOptions = () => [
        {
            key:'user',
            text: <span>Signed in as <strong>{this.props.currUser.currUser.currUser.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        }
    ]

    handleSignOut = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('you signed out')
        })
        .catch(err => {
            console.log(err)
        })
    }

  render() {
    //   console.log(this.props.currUser.currUser.currUser)
    return (
      <Grid style={{background: '#4c3c4c'}}>
        <Grid.Column>
            <Grid.Row style={{padding: '1.2em', margin: 0}}>
                <Header inverted floated='left' as='h2'>
                    <Icon name='paper plane outline'/>
                    <Header.Content>Slac</Header.Content>
                </Header>
            <Header style={{padding: '0.25em'}} as='h4' inverted>
                <Dropdown 
                trigger={
                    <span>
                    <Image src={this.props.currUser.currUser.currUser.photoURL} spaced='right' avatar/>
                    {this.props.currUser.currUser.currUser.displayName}
                    </span>
                } 
                options={this.dropdownOptions()}
                />
            </Header>
            </Grid.Row>

        </Grid.Column>
      </Grid>
    )
  }
}

export default UserPanel
