import {getAll,Create,Update,Delete,getById} from '../Action/FormCrud';


const initialstate={
    data:[],
    singleData:[],
    status:'',
    Update:false,
};

const FormCrudReducer =(state=initialstate,action)=>{
    switch(action.type){
        case getAll:
            return{
                ...state,
                data:action.payload
            };

            case getById:
            return{
                ...state,
                singleData:action.payload
            };
            case Create:
            return{
                ...state,
                status:action.payload
            };case Update:
            return{
                ...state,
                status:action.payload
            };
            case Delete:
                return{
                    ...state,
                    status:action.payload
                }
             default:
            return state
    }
    
};
export default FormCrudReducer;