
import React from 'react'
import {Button,Row,Col, Container } from 'react-bootstrap'
import history from '../../history'

class Header extends React.Component{

    logOut=()=>{
        localStorage.clear();
           history.push('/')
    }
    render(){
        return(
            <div style={{
                background:'#888888',
                padding:'10px 10px 10px 10px'
            }}>
                <Container fluid >

                
                               <Row>
                               <Col lg={1} md={1} sm={1}>
                                   </Col>
                                    <Col lg={10} md={10} sm={10}>
                                    <h3>Spice Blue</h3>
                                    </Col>
                                    <Col lg={1} md={1} sm={1}>
                                    <Button variant="dark" onClick={this.logOut}>Logout</Button>   
                                    </Col>
                                </Row>
                    </Container>             
           
            </div>
        )  
    }
}

export default Header;