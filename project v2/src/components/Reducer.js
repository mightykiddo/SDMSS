
const Reducer = ( state, action  ) => {
    
    switch ( action.type ) {

        case 'CREATE': 

        return {

            ...state, trans: [ ...state.trans, action.payload ]
        }

        case 'UPDATE': 

        return {

            ...state, trans: [ ...action.payload ]
        }

        case 'DELETE':
        
        return {
            ...state, trans: state.trans.filter( tran => tran.id !== action.payload )
        }

        default:

            return state; 

    }
}


export default Reducer
