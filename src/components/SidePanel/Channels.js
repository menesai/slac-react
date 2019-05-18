import React, { Component } from 'react'
import {Menu, Icon, Modal, Form, Input, Button} from 'semantic-ui-react';
// import firebase from '../../firebase'

class Channels extends Component {
    state={
        // user: this.props,
        // channels: [...this.props.channelz],
        modal: false,
        nameChannel: '',
        channelDetails: '',
        // channelsRef: this.props.channelsRefz,
        currentChannel: null,
        firstLoad: true,
        activeChannel: ''
    }

    // componentDidMount(){
    //     this.addListeners()
    // }
    componentWillMount(){
        this.removeListeners()
    }

    // addListeners = () => {
    //     let loadedChannels =[];
    //     this.state.channelsRef.on('child_added', snap => {
    //         loadedChannels.push(snap.val());
    //         this.setState({channels: loadedChannels}, () => this.setFirstChannel())
    //         // console.log(loadedChannels)
    //     })
    // }

    removeListeners = () => {
        this.props.channelsRefz.off()
    }

    setFirstChannel = () => {
        const firstChannel = this.props.channelz[0]
        if(this.state.firstLoad && this.state.firstLoad.length > 0){
            this.state.currentChannel(firstChannel)
            this.setActiveChannel(firstChannel)
            // console.log(firstChannel)
        }
        this.setState({firstLoad: false})
    }

    closeModal = () => this.setState({modal: false})
    
    openModal = () => this.setState({modal: true})
    

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addChannel = () => {
        const { nameChannel, channelDetails} =this.state;
        const {channelsRefz} = this.props;

        const key = channelsRefz.push().key;

        const newChannel = {
            id: key,
            name: nameChannel,
            details: channelDetails,
            createdBy: {
                name: this.props.currUser.currUser.displayName,
                avatar: this.props.currUser.currUser.photoURL
            }
        }
        channelsRefz
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({nameChannel: '', channelDetails: ''})
            this.closeModal()
            console.log('channel added')
        })
        .catch(err => {
            console.error(err)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.isFormValid(this.state)){
            this.addChannel()
        }
    }

    isFormValid = ({nameChannel, channelDetails}) => nameChannel && channelDetails;

    changeChannel = channel => {
        const {channelz} =this.props
        // this.props.setCurrentChannel(channel)
        // console.log(channel)
        this.setActiveChannel(channelz)
        this.setState({currentChannel: channelz})
    }

    setActiveChannel = (channel) => {
        // console.log(this.props.channelz)
        return channel.map((el) => {
            // console.log(el.nam)
            // return 
            this.setState({activeChannel: el.id})
        })
        
    }

  render() {
      console.log(this.state.activeChannel)
   let displayChannels = this.props.channelz.map(channel => {
            // console.log(channel)
            return (
                <Menu.Item
                    key={channel.id}
                    onClick={() => this.changeChannel(channel)}
                    name={channel.name}
                    style={{opacity: 0.7}}
                    active={channel.id === this.state.activeChannel}
                    >
                    # {channel.name}
                    </Menu.Item>  
            ) 
    })
      const {channelz} = this.props
    return (
 <React.Fragment>
      <Menu.Menu style={{paddingBottom:'2em'}}>
        <Menu.Item>
            <span>
                <Icon name='exchange'/> Channels
            </span>{' '}
            ({channelz.length}) <Icon name='add' onClick={this.openModal}/>
        </Menu.Item>

        {displayChannels}
        {/* {this.displayChannels} */}
      </Menu.Menu>
      <Modal basic open={this.state.modal} onClose={this.closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Input
                        fluid
                        label='Name of channel'
                        name='nameChannel'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        fluid
                        label='About the channel'
                        name='channelDetails'
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
        </Modal.Content>

        <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSubmit}>
                <Icon name='checkmark'/> Add
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
                <Icon name='remove'/> Cancel
            </Button>
        </Modal.Actions>   
      </Modal>
 </React.Fragment>
    )
  }
}

export default Channels
