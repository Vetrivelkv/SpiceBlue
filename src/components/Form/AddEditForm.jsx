import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { postData, updateData, deleteData } from "../../store/Action/FormCrud";
import { useDispatch } from "react-redux";

const AddEditForm = (props) => {  
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  //used to find whether add or update operation is going to be performed
  useEffect(() => {
    if (props.detectOps === "edit") {
      
      setDescription(props.data.description);
      setId(props.data.id);
      setDate(new Date(props.data.date).toLocaleDateString("fr-CA"));
      setTime(props.data.time);
      setAssignedTo(props.data.assignedTo);
    } else if (props.detectOps == "add") {
      setDescription("Hooks Follow up");
      setId("");
      setDate(new Date().toLocaleDateString("fr-CA"));
      setTime("00:00");
      setAssignedTo("Vetri");
    }
  }, [props]);
  //used to find whether add or update operation is going to be performed

  //send data to post or put call depending on the ID
  const submit = (e) => {
    e.preventDefault();
    var hms = time; // your input string
    var a = hms.split(":"); // split it at the colons
    var seconds = +a[0] * 60 * 60 + +a[1] * 60;
    const params = {
      task_msg: description,
      task_date: date,
      task_time: seconds,
      is_completed: 1,
      assigned_user: assignedTo,
      time_zone: -330,
    };

    if (id === "") {      
      dispatch(postData(params));
      setTimeout(() => {
        props.updateCompo();
        props.close();
      }, 2000);
    } else {
      dispatch(updateData(params, id));      
      setTimeout(() => {
        props.updateCompo();
        props.close();
      }, 2000);
    }
  };
  //send data to post or put call depending on the ID

  //delete task
  const del = () => {
    const deleteId = id;

    if (deleteId) {
      dispatch(deleteData(id));

      setTimeout(() => {
        props.updateCompo();
        props.close();
      }, 1000);
    }
  };

  //delete task

  const onChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Row>
          <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Description"
              onChange={(e) => onChangeHandler(e)}
              value={description}
              //defaultValue={description}
              name="description"
            />
          </Form.Group>
        </Form.Row>

        <Form.Row className="acount-filled">
          <Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6}>
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              type="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="date"
              value={date}
              name="date"
            />
          </Form.Group>
          <Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6}>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              onChange={(e) => setTime(e.target.value)}
              placeholder="time"
              value={time}
              name="time"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="acount-filled">
          <Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Label>Assign User</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Assign User"
              value={assignedTo}
              name="assignedTo"
              defaultValue=""
            />
          </Form.Group>
        </Form.Row>
        <Row>
          <Col md={1} sm={1} lg={1}></Col>
          <Col md={4} sm={4} lg={4}>
            {id === "" ? (
              ""
            ) : (
              <h4>
                <i class="fa fa-trash-o" aria-hidden="true" onClick={del}></i>
              </h4>
            )}
          </Col>
          <Col md={1} sm={1} lg={1}></Col>
          <Col md={6} sm={6}>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={props.close}
              className="formBtn"
            >
              Cancel
            </Button>
            &nbsp;
            <Button variant="success" type="submit" className="formBtn">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default AddEditForm;
