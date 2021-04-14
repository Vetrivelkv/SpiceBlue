import React, { Component } from 'react';
import {  Form, Button, Col, Row } from 'react-bootstrap';
import { getData, postData, updateData,deleteData } from '../../store/Action/FormCrud';
import { connect } from 'react-redux';




class AddEditForm extends Component  {
    constructor(props){
           super(props);
           this.state = {
            description: this.props.data.description,
            id: this.props.data.id,		
            date: this.props.data.date,
            time: this.props.data.time,
            assignedTo: this.props.data.assignedTo,                        
        }
        
    }
    componentDidUpdate(prevProps){
        if(this.props.detectOps === "edit")
        {
            console.log('working as expected')
                   if(prevProps !==this.props)
                   {
                        this.setState({
                            description:this.props.data.description,
                            id: this.props.data.id,		
                            date: this.props.data.date,
                            time: this.props.data.time,
                            assignedTo: this.props.data.assignedTo, 
                        })
                   }
                   
        }
        else {
            if(prevProps !==this.props)
            {
                this.setState({
                    description: 'Follow up',
                    id: '',		
                    date: new Date().toLocaleDateString('fr-CA'),
                    time: '00:00',
                    assignedTo: 'Vetri',
                })
            }
            
        }
    }
    submit = (e) => {
			
		e.preventDefault();
		const { description, date, time, assignedTo, id } = this.state;
		var hms = time;   // your input string
		var a = hms.split(':'); // split it at the colons				
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ;
		const params = {				
			task_msg:description,
			task_date:date,
			task_time: seconds,
			is_completed:1,		
			assigned_user:assignedTo,
			time_zone:-330
		}
		
		if (id === '') {		
            	
        this.props.postData(params);	
        this.props.close();	
        
        setTimeout(() => {
            this.props.updateCompo();    
        }, 2000);
        
		

		} else {
                this.props.updateData(params, id);
                this.props.close();	     
                setTimeout(() => {
                    this.props.updateCompo();    
                }, 1000);
                
        

		}

    };
    handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
    };
    delete = () => {
		const { id } = this.state;

		if (id) {
            this.props.deleteData(id)
			this.props.close();	
            setTimeout(() => {
                this.props.updateCompo();    
            }, 1000);
		}

	};
    render(){
        const{description,date,time,assignedTo,id}=this.state
        return (
            <Form  onSubmit={this.submit}>

            <Form.Row>
                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Description if task"
                        onChange={this.handleChange}
                        value={description}
                        name="description"
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row className="acount-filled">
                <Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6} >
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        required
                        type="date"
                        onChange={this.handleChange}
                        placeholder="date"
                        value={date}
                        name="date"

                    />
                </Form.Group>
                <Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6} >
                    <Form.Label>Time</Form.Label>
                    <Form.Control

                        type="time"
                        onChange={this.handleChange}
                        placeholder="time"
                        value={time}
                        name="time"


                    />
                </Form.Group>
            </Form.Row>
            <Form.Row className="acount-filled">
                <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Form.Label>Assign User</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Assign User"
                        value={assignedTo}
                        name="assignedTo"

                    />
                </Form.Group>
            </Form.Row>
            <Row>
                <Col md={1} sm={1} lg={1}>
                </Col>
                <Col md={4} sm={4}lg={4}>
                    {id === '' ? 
                    ""
                    :<h4>
                        
                        <i class="fa fa-trash-o" aria-hidden="true" onClick={this.delete }></i>
                    </h4>
                    }
                    
                </Col>
                <Col md={1} sm={1} lg={1}>
                </Col>
                <Col md={6} sm={6}>
                    <Button variant="outline-secondary"  type="button" onClick={this.props.close} className="formBtn" >
                        Cancel
                      </Button>
                     &nbsp;
                    <Button variant="success" type="submit" className="formBtn">
                       Save
                      </Button>
                    
                    
                    
                </Col>
            </Row>
        </Form>

        )
    }
    
}
const mapStateToProps = (state) => (		
	{	
	alltasks: state.FormCrudReducer.Tasks,
	statusMessage: state.FormCrudReducer.status,
}
)

export default connect(mapStateToProps, { getData, postData, updateData,deleteData })(AddEditForm);
