import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import  './App.css'
import Login from './components/Login/Login';
import FormCrud from './components/Form/FormCrud';
import AuthenticatedRoute from './components/Authentication/routes/AuthenticatedRoutes'



class App extends Component {
	
	render() {
		return (
			<div>
						<Router history={history}>
							<Switch>
								<Route exact path="/" component={Login} />	
								<AuthenticatedRoute exact path="/crud" component={FormCrud}/>
							</Switch>
						</Router>
			</div>		
		);
	}
}

export default App;
