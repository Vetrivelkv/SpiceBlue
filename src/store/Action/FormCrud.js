import axios from 'axios';
import API from '../../API/Api';

export const Delete ='delete';
export const getAll = 'getAll';
export const Create = 'Create';
export const Update = 'Update';


export const deleteData = (id) => async dispatch => {
    await axios.delete(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`)
        .then(response => response.data)
        .then(
            result => {
                console.log(result)
                dispatch({
                    type: Delete,
                    payload: 'Success'
                });                	                
            },
            err => {             
                dispatch({
                    type: Delete,
                    payload: 'Error'
                });
            }
        );
};


export const postData = (data) => async dispatch => {
    await axios.post(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303`,data)
        .then(response => response.data)
        .then(
            result => {
                console.log(result)
                dispatch({
                    type: Create,
                    payload: 'Success'
                });
                // window.location.reload();		                
            },
            err => {             
                dispatch({
                    type: Create,
                    payload: 'Error'
                });
            }
        );
};
// this module update the ttask
export const updateData = (data,id) => async dispatch => {
    await axios.put(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`,data)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: Update,
                    payload: 'Success'
                });
                dispatch(getData)
            },
            err => {            
                dispatch({
                    type: Update,
                    payload: 'Error'
                });
            }
        );
};

// this module handles get all task

export const getData= () => async dispatch => {
  
    await axios.get(`${API.baseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303`)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: getAll,
                    payload: result.results
                });
            },
            err => {
                dispatch({
                    type: getAll,
                    payload: []
                });

            }
        );
};
