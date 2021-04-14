import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container,  Card, ListGroup,Col, Row } from 'react-bootstrap';
import { getData, postData, updateData } from '../../store/Action/FormCrud';
import './Form.css';
import API from '../../API/Api';
import AddEditForm from './AddEditForm';
import Header from '../Header/Header';


class FormCrud extends Component {
	state = {
		description: 'Follow up',
		id: '',		
		date: new Date().toLocaleDateString('fr-CA'),
		time: '00:00',
		assignedTo: 'Vetri',
		hide: true,
		listTask: [],
		formOps:'',		
		result:''
	}
	
	componentDidMount() {
		
		const token = JSON.parse(localStorage.getItem('token'));		
		axios.interceptors.request.use(function (config) {
            config.headers.common['Authorization'] = 'Bearer ' +token;	
			config.headers.common['Accept'] = 'application/json';
			 config.headers.common['Content-Type'] = 'application/json';

			return config;
		})
		
		this.props.getData();
		this.getData();
	};
	
	
	getData=()=>{
		console.log('hitingo on update')
		axios.get(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303`)
        .then(response => response.data)
        .then(
            result => {
				console.log(result)
				this.setState({
					listTask: result.results					
				});
				this.forceUpdate()
            },
            err => {
                

            }
        )
	}
		  
convertTime(data) {
		let time = Number(data);	
		let hrs = Math.floor(time / 3600);
		let min = Math.floor(time % 3600 / 60);		
		return ( ('0' + hrs).slice(-2) + ":" +('0' + min).slice(-2)  )
	}
	
	

	edit = (i) => {
		

		this.setState({
			id: i.id
		})
		if (i.id) {
			
			axios
				.get(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303/${i.id}`)
				.then(response => response.data)
				.then(
					result => {												
						console.log(result) 
						this.setState({result:result})
						this.setState({
							description: result.results.task_msg,
							id: result.results.id,
							date: new Date(result.results.task_date).toLocaleDateString('fr-CA'),
							time:this.convertTime(result.results.task_time),
							assignedTo: result.results.assigned_user,
							hide: false,
							formOps:'edit'
						});						
						
																	
					},
					err => {
						console.log(err);
					}
				);
		}

	};
	
	closeForm = () => {
		
		this.setState({	
			
			hide: true,
			id: ''
		})
	};
	
	displayForm = () => {
		this.setState({			
			hide: false,
			formOps:'add'							
		})
		
	};	
	
	

	
	render() {
		
		const {  listTask, hide ,description,date,time,assignedTo,id,formOps} = this.state;
		return (
			<div>
				<Header />
				<Container className="formHead">
					
					<Row>
						<Col>
						</Col>
						
						<Col>
						<Card style={{ width: '28rem' }}>
							<Card.Header >TASKS {listTask.length?listTask.length:0} 
							<a  onClick={this.displayForm} href> 
							<h5 className="float-right hover ">
								<i class="fa fa-plus-circle" aria-hidden="true"></i>
							</h5>
							</a>
							</Card.Header >
							<ListGroup variant="flush">
								<ListGroup.Item hidden={hide}
								className="addUpdateForm"
								>
									<AddEditForm
									 close={this.closeForm.bind(this)}
									 updateCompo={this.getData.bind(this)}
									 data={{
                                          description,date,time,assignedTo,id
									 }}
									 detectOps={formOps}
									 
									 
									 
									 />

								
								</ListGroup.Item>
								{listTask.map(data => (
									<ListGroup.Item>
										<Row>
											<Col lg={1} md={1} sm={1}>
											<h3>
											<i class="fa fa-user-circle" aria-hidden="true"></i>
										    </h3>
											</Col>

											
											<Col lg={11} sm={11} md={11}>
											<h5>										
											{data.task_msg}</h5>										
											{new Date(data.task_date).toLocaleDateString('fr-CA')}
											<h5 onClick={() => this.edit(data)} style={{ marginTop: '-25px' }} className=" float-right hideEdit hover">
											<i class="fa fa-pencil" aria-hidden="true"></i>
											</h5>
											</Col>
										
										
										</Row>
										
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>

						</Col>

						<Col>
						</Col>
					</Row>																
				</Container>
			</div>
		)

	}
}
const mapStateToProps = (state) => (		
	{	
	alltasks: state.FormCrudReducer.data,
	statusMessage: state.FormCrudReducer.status,	
     }
)
export default connect(mapStateToProps, { getData, postData, updateData })(FormCrud);