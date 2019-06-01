import React, { Component } from 'react'
import {Segment, Comment} from 'semantic-ui-react';
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import firebase from '../../firebase'
import Message from './Message';

class Messages extends Component {
    state ={
      messagesRef: firebase.database().ref('messages'),
      channel: this.props.currentChannel,
      user: this.props.currentUser,
      messages: [],
      messagesLoading: true,
      numUniqueUser: '',
      searchTerm: '',
      searchLoading: false,
      searchResults: []
    }

    componentDidMount(){
      const {channel, user} =this.state;

      if(channel && user){
        this.addListener(channel.id)
      }
    }

    addListener = (channelId) => {
      this.addMessageListener(channelId)
    }

    addMessageListener = (channelId) => {
      let loadedMessages = [];
      this.state.messagesRef.child(channelId).on('child_added', snap => {
        loadedMessages.push(snap.val())
        // console.log(loadedMessages)
        this.setState({messages: loadedMessages, messagesLoading: false})
      })
      this.countUniqueUsers(loadedMessages)
    }    

    countUniqueUsers = (messages) => {
      const uniqueUser = messages.reduce((acc, message) => {
        // console.log(acc)
        if(!acc.includes(message.user.name)){
          acc.push(message.user.name)
        }
        return acc
      }, [])
      const numUniqueUser = `${uniqueUser.length} users`
      this.setState({numUniqueUser})
    }

    displayMessages = messages =>
    messages.length > 0 &&
    messages.map((message, i) => (
      <Message
        key={i}
        message={message}
        user={this.state.user}
      />
    ));

    displayChannel = (channel) => channel ? `# ${channel.name}`: '';

    handleSearchChange = (e) => {
      this.setState({
        searchTerm: e.target.value,
        searchLoading: true
      }, () => {this.handleSearchMessage()})
    }

    handleSearchMessage = () => {
      // console.log(this.state.messages)
      const channelMessages = [...this.state.messages];
      const regex = new RegExp(this.state.searchTerm, 'gi');
      const searchResults = channelMessages.reduce((acc, message) => {
        // console.log(message)
        if(message.content && message.content.match(regex) || message.user.name.match(regex)){
          acc.push(message)
        }
        return acc
      }, [])
      this.setState({searchResults})
    }

    

  render() {
    const {messagesRef, channel, user, messages, numUniqueUser, searchTerm, searchResults}=this.state;
    return (
      <React.Fragment>
        <MessageHeader
          channelName={this.displayChannel(channel)}
          numUniqueUser={numUniqueUser}
          handleSearchChange={this.handleSearchChange}
        />

        <Segment>
          <Comment.Group className='messages'>
            {/* {this.displayMessages(messages)} */}
            { searchTerm ? this.displayMessages(searchResults): this.displayMessages(messages)}

          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    )
  }
}

export default Messages
