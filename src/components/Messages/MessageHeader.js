import React, { Component } from 'react'
import {Header, Segment, Input, Icon} from 'semantic-ui-react';

class MessageHeader extends Component {
  render() {
    const {channelName, numUniqueUser, handleSearchChange, isPrivateChannel, isChannelStarred, handleStar} =this.props;
    return (
      <Segment clearing>
        <Header fluid='true' as='h2' floated='left' style={{marginBottom: 0}}>
            <span>
                {channelName} {' '}
                {!isPrivateChannel && (
                <Icon 
                name={isChannelStarred ? 'star' : 'star outline'} 
                color={isChannelStarred ? 'yellow': "black"} 
                onClick={handleStar}/>)}
            </span>
            <Header.Subheader>{numUniqueUser}</Header.Subheader>
        </Header>

        <Header floated='right'>
            <Input 
              onChange={handleSearchChange}
              size='mini'
              icon='search'
              name='searchTerm'
              placeholder='Search Messages'  
            />
        </Header>
      </Segment>
    )
  }
}

export default MessageHeader
