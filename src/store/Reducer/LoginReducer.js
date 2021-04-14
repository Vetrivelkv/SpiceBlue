import {LoginAction} from '../Action/Login';


const initialstate={        
    authenticated: ''
};

const LoginReducer =(state=initialstate,action)=>{
    switch(action.type){
        
            case LoginAction:
            return{
                ...state,
                 authenticated: action.payload
            };
             default:
            return state
    }
    
};
export default LoginReducer;


