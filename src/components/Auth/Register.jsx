import React, { Component } from 'react'
import firebase from '../../firebase'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import '../Auth/AuthCss/Register.css';
import md5 from 'md5'

class Register extends Component {
    constructor(){
        super();
        this.state={
            username: '',
            password: '',
            email: '',
            passwordConfirmation: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref("users") 
        }
    }

        isFormValid = () => {
            let errors = []
            let error;
            
            

            if(this.isFormEmpty(this.state)){
                //return erros 
                error = {message: 'Fill in all fields'}
                this.setState({errors: errors.concat(error)})
                return false
            } else if(!this.isPasswordValid(this.state)){
                //return erros
                error = {message: 'password is invalid'}
                this.setState({errors: errors.concat(error)})
                return false 
            } else {
                return true
            }
        }

        isFormEmpty = ({username, password, email, passwordConfirmation}) => {
            return !username.length || !password.length || !password.length || !email.length || !passwordConfirmation.length
        }

        isPasswordValid = ({password, passwordConfirmation}) => {
            if(password.length < 6 || passwordConfirmation.length < 6){
                return false
            } else if(password !== passwordConfirmation){
                return false
            } else {
                return true
            }
        }

        displayErrors = (errors) => errors.map((er, i) => <p key={i}>{er.message}</p>)

        handleChange = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        handleSubmit = (e) => {
            const {email, password} =this.state;
            e.preventDefault()
            if(this.isFormValid()){
                this.setState({errors: [], loading: true})
                firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(() =>{
                        this.saveUser(createdUser).then(() => {
                            console.log('user saved')
                            // this.props.history.push('/login')
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({errors: this.state.errors.concat(err), loading: false})
                    })
                }).catch(err => {
                    console.log(err)
                    this.setState({errors: this.state.errors.concat(err), loading: false})
                })
            }
        }

        saveUser = (createdUser) => {
            return this.state.usersRef.child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                avatar: createdUser.user.photoURL
            })
        }

        handleErrors = (errors, inputName) => {
            return errors.some(error => 
                error.message.toLowerCase().includes(inputName)) ? 'error': ''
        }

  render() {
      const {username, password, email, passwordConfirmation, errors, loading} =this.state
    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' icon color="orange" textAlign='center'>
                    <Icon name='paper plane outline' color='orange'/>
                        Register for Slac
                </Header>
                <Form onSubmit={this.handleSubmit} size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name='username'
                            icon='user'
                            iconPosition='left'
                            placeholder='Enter username'
                            onChange={this.handleChange}
                            type='text'
                            value={username}
                        />
                        <Form.Input
                            fluid
                            name='email'
                            icon='mail'
                            iconPosition='left'
                            placeholder='Enter email'
                            onChange={this.handleChange}
                            type='email'
                            value={email}
                            className={this.handleErrors(errors, 'email')}
                        />
                        <Form.Input
                            fluid
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Enter password'
                            onChange={this.handleChange}
                            type='password'
                            value={password}
                            className={this.handleErrors(errors, 'password')}
                        />
                        <Form.Input
                            fluid
                            name='passwordConfirmation'
                            icon='repeat'
                            iconPosition='left'
                            placeholder='Re-enter password'
                            onChange={this.handleChange}
                            type='password'
                            value={passwordConfirmation}
                            className={this.handleErrors(errors, 'password')}

                        />

                        <Button disabled={loading} className={loading ? 'loading': ''} color='orange'fluid size='large' type='Submit'>Submit</Button>
                    </Segment>
                </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                                {this.displayErrors(errors)}
                        </Message>
                    )}
                <Message>Already a <Link to='/login'>user?</Link></Message>
            </Grid.Column>
        </Grid>
    )
  }
}

export default Register
