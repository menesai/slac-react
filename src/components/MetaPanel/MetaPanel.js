import React, { Component } from 'react'
import {Segment, Accordion, Header, Icon, Image} from 'semantic-ui-react'

export class MetaPanel extends Component {
    state={
      activeIndex: 0,
      privateChannel: this.props.isPrivateChannel,
      channel: this.props.currentChannel
    }

    setActiveIndex = (e, titleProps) => {
      const {index} = titleProps;
      const {activeIndex} = this.state;

      const newIndex = activeIndex === index ? -1 : index;
      this.setState({activeIndex: newIndex})
    }

  render() {
    // console.log(this.props)
    const {activeIndex, privateChannel, channel}=this.state;

    if(privateChannel || !channel) return null
  
    return (
     <Segment>
       <Header as='h3' attached='top'>
        About # {channel.name}
       </Header>
       <Accordion styled attached='true'>

          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.setActiveIndex}>
            <Icon name='dropdown'/>
            <Icon name='info'/>
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {channel.details}
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.setActiveIndex}>
            <Icon name='dropdown'/>
            <Icon name='user circle'/>
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            posters
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.setActiveIndex}>
            <Icon name='dropdown'/>
            <Icon name='pencil alternate'/>
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <Header textAlign='center' as='h3'>
            <Image circular src={channel.createdBy.avatar}/>
            {channel.createdBy.name}
            </Header>
          </Accordion.Content>

       </Accordion>
     </Segment>
    )
  }
}

export default MetaPanel
