import axios from 'axios';
import API from '../../API/Api';
import history from '../../history'

export const LoginAction = 'LoginAction';


//login API request using redux action
export const LoginRedux= (params) => async dispatch =>{
        
    await axios.post(`${API.baseUrl}/login`,params)
        .then(response => response.data)
        .then(
            result =>{
                console.log(result)
                localStorage.setItem('token', JSON.stringify(result.results.token));
                
                dispatch({
                    type: LoginAction,
                    payload: result.results.token
                });

                history.push('/crud');
          
            },
            err => {             
                dispatch({
                    type: LoginAction,
                    payload: 'Failed'
                });
            }

        )
}

//login API request using redux action