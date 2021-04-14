import LoginReducer from './LoginReducer';
import FormCrudReducer from './FormCrudReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    LoginReducer,
    FormCrudReducer
})

export default rootReducer