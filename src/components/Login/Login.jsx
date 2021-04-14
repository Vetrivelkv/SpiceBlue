import React, { Component } from 'react';
import './Login.css'
import { Button, Form ,Container, Row, Col} from 'react-bootstrap';
import {LoginRedux} from '../../store/Action/Login'
import { connect } from 'react-redux';

class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			email:'spicebluetest2@gmail.com',
			password:'12345678'
		}
                
	}
	Login=(event)=>{
		event.preventDefault();
		const{email,password}=this.state;
		const params={
			email,
			password
		}
		console.log(params)
		this.props.LoginRedux(params)
	}
	render(){
		const{email,password}=this.state
		return (		
			<Container fluid >
				    <Row className="loginContainer">
					<Col ></Col>
					<Col >
					<div className="loginForm">
					<h4 className="loginHeader"> LOGIN</h4>
					<Form onSubmit={this.Login} >
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="text" required disabled placeholder="Email" name="email" value={email} 
							/>

						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" required disabled placeholder="Password" name="password" value={password}  />
						</Form.Group>
                        
						<Row>
							<Col>
							
							</Col>
							<Col>
								<Button variant="primary" type="submit"className="mb-4">
								Login
								</Button>
							</Col>
							<Col>
							
							</Col>
						</Row>

						

					</Form>
					</div>		
					</Col>
					<Col ></Col>
					</Row>
					
			</Container>		
	)
	}
}
export default connect(null, { LoginRedux })(Login);