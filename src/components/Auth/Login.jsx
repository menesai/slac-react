import React, { Component } from 'react'
import firebase from '../../firebase'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state={
            password: '',
            email: '',
            errors: [],
            loading: false,
        }
    }

      

        displayErrors = (errors) => errors.map((er, i) => <p key={i}>{er.message}</p>)

        handleChange = (e) => {
            this.setState({[e.target.name]: e.target.value})
        }

        handleSubmit = (e) => {
            const {email, password, errors} =this.state;
            e.preventDefault()
            if(this.isFormValid(this.state)){
                this.setState({errors: [], loading: true})
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(signedInUser => {
                        console.log(signedInUser)
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({ errors: errors.concat(err), loading: false})
                    })           
            }
        }

        isFormValid = ({email,password}) => email && password;


        handleErrors = (errors, inputName) => {
            return errors.some(error => 
                error.message.toLowerCase().includes(inputName)) ? 'error': ''
        }

        componentDidMount(){
            firebase
            .auth()
            .onAuthStateChanged(user => {
                if(user){
                    this.props.history.push('/');
                } else {
                    return null
                }
            })
        }

  render() {
      const { password, email, errors, loading} =this.state
    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' icon color="violet" textAlign='center'>
                    <Icon name='paper plane outline' color='violet'/>
                        Login to Slac
                </Header>
                <Form onSubmit={this.handleSubmit} size='large'>
                    <Segment stacked>
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
                        
                        <Button disabled={loading} className={loading ? 'loading': ''} color='violet' fluid size='large' type='Submit'>Submit</Button>
                    </Segment>
                </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                                {this.displayErrors(errors)}
                        </Message>
                    )}
                <Message>New to <Link to='/register'>Slac ?</Link></Message>
            </Grid.Column>
        </Grid>
    )
  }
}

export default Login;
