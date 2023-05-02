import React, { createContext, useReducer  } from 'react';

import Reducer from './Reducer'; 

import { reactLocalStorage } from 'reactjs-localstorage';

const localcheck = reactLocalStorage.getObject('REACTPROJ4');

const initialState = {
    trans: []
}
if ( Object.entries( localcheck ).length > 0 ) {

    initialState.trans = localcheck; 
}


export const GlobalContext = createContext( initialState );

export const GlobalStore = ( { children }  ) => {

    const [state, dispatch] = useReducer( Reducer, initialState)

    const createTask = ( tran ) => {

        console.log('in create ', tran );

        dispatch( {

            type: 'CREATE', 
            payload: tran 
        } )
    }

    const updateTask = ( id ) => {

        const temp = [ ...state.trans ];

        const i = temp.findIndex( tran => tran.id === id );

        const status = temp[i].done;

        temp[i].done = status ? false : true; 

        dispatch ( { 
            type:'UPDATE',
            payload: temp
        }  )

    }

    const deleteTask = ( id ) => {

        dispatch( {
            type: 'DELETE',
            payload: id 
        } )
    }


    return (
        <GlobalContext.Provider   value= { { trans: state.trans, createTask, updateTask, deleteTask }  } >
            { children }
        </GlobalContext.Provider>
    )
}


