import React, { Component, useEffect, useState, useRef } from "react";
import axios from "axios";
import {  useDispatch } from "react-redux";
import store from "../../store/index";
import { Container, Card, ListGroup, Col, Row } from "react-bootstrap";
import { getData, getDataById } from "../../store/Action/FormCrud";
import "./Form.css";
import AddEditForm from "./AddEditForm";
import Header from "../Header/Header";

const FormCrud = () => {

  //inputs used for add and update functionalities
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString("fr-CA"));
  const [time, setTime] = useState("00:00");
  const [assignedTo, setAssignedTo] = useState("");
  const [hide, setHide] = useState(true);
  const [listTask, setListTask] = useState([]);
  const [formOps, setformOps] = useState("");
  const [result, setResult] = useState("");
  //inputs used for add and update functionalities

  useEffect(() => {
    //used to send headers along with all api requests
    const token = JSON.parse(localStorage.getItem("token"));
    axios.interceptors.request.use(function (config) {
      config.headers.common["Authorization"] = "Bearer " + token;
      config.headers.common["Accept"] = "application/json";
      config.headers.common["Content-Type"] = "application/json";

      return config;
    });
    //used to send headers along with all api requests

    //Making Api request for Getting All Task
    dispatch(getData());
    setTimeout(() => {
      setListTask(store.getState().FormCrudReducer.data);
    }, 1000);
	//Making Api request for Getting All Task
	
  },[dispatch]);

  //used as a call back to get latest task data ,when requested from AddEditFormComponent
  const getTaskData = () => {
    dispatch(getData());
    setTimeout(() => {
      setListTask(store.getState().FormCrudReducer.data);
    }, 1000);
  };
  //used as a call back to get latest task data ,when requested from AddEditFormComponent

  //time conversion function
  const convertTime = (data) => {
    let time = Number(data);
    let hrs = Math.floor(time / 3600);
    let min = Math.floor((time % 3600) / 60);
    return ("0" + hrs).slice(-2) + ":" + ("0" + min).slice(-2);
  };
  //time conversion function

  //hides AddEditForm components
  const closeForm = () => {
    setHide(true);
    setId("");
  };
  //hides AddEditForm components

  //shows AddEditForm components
  const displayForm = () => {
    setHide(false);
    setformOps("add");
  };
  //shows AddEditForm components

  //Getting Single Task for Update

  const edit = (i) => {
    setId(i.id);

    if (i.id) {
      dispatch(getDataById(i.id));
      setTimeout(() => {
        let result = store.getState().FormCrudReducer.singleData;
        setResult(result);
        setDescription(result.task_msg);
        setId(result.id);
        setDate(new Date(result.task_date).toLocaleDateString("fr-CA"));
        setTime(convertTime(result.task_time));
        setAssignedTo(result.assigned_user);
        setHide(false);
        setformOps("edit");
      }, 500);
    }
  };
  //Getting Single Task for Update

  return (
    <div>
      <div>
        <Header />
        <Container className="formHead">
          <Row>
            <Col></Col>

            <Col>
              <Card style={{ width: "28rem" }}>
                <Card.Header>
                  TASKS {listTask.length ? listTask.length : 0}
                  <a onClick={displayForm} href>
                    <h5 className="float-right hover ">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </h5>
                  </a>
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item hidden={hide} className="addUpdateForm">
                    <AddEditForm
                      close={closeForm}
                      updateCompo={getTaskData}
                      data={{
                        description,
                        date,
                        time,
                        assignedTo,
                        id,
                      }}
                      detectOps={formOps}
                    />
                  </ListGroup.Item>
                  {listTask.map((data) => (
                    <ListGroup.Item>
                      <Row>
                        <Col lg={1} md={1} sm={1}>
                          <h3>
                            <i class="fa fa-user-circle" aria-hidden="true"></i>
                          </h3>
                        </Col>

                        <Col lg={11} sm={11} md={11}>
                          <h5>{data.task_msg}</h5>
                          {new Date(data.task_date).toLocaleDateString("fr-CA")}
                          <h5
                            onClick={() => {
                              edit(data);
                            }}
                            style={{ marginTop: "-25px" }}
                            className=" float-right hideEdit hover"
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </h5>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>

            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default FormCrud;
