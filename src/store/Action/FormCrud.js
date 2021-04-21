import axios from 'axios';
import API from '../../API/Api';

export const Delete ='delete';
export const getAll = 'getAll';
export const Create = 'Create';
export const Update = 'Update';
export const getById="getById"


// Redux Action for Deleting Task API Request
export const deleteData = (id) => async dispatch => {
    await axios.delete(`${API.baseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598/${id}`)
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
//Redux Action for for Deleting Task API Request


//Redux Action for Post Task API Request
export const postData = (data) => async dispatch => {
    await axios.post(`${API.baseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598`,data)
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
//Redux Action for Post Task API Request

//Redux Action for Put Task API Request
export const updateData = (data,id) => async dispatch => {
    await axios.put(`${API.baseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598/${id}`,data)
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
//Redux Action for Put Task API Request


//Redux Action for Getting ALL Task API Request
export const getData= () => async dispatch => {
  
    await axios.get(`${API.baseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598`)
    
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
//Redux Action for Getting ALL Task API Request


//Redux Action for Getting a single Task API Request
export const getDataById= (id) => async dispatch => {
  
    await axios.get(`${API.baseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598/${id}`)
    
        .then(response => response.data)
        .then(
            result => {
                
                    dispatch({
                        type: getById,
                        payload: result.results
                    });  
                
                
            },
            err => {
                dispatch({
                    type: getById,
                    payload: []
                });

            }
        );
};

//Redux Action for Getting a single Task API Request