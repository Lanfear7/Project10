import React, { Component } from 'react'
import Data from './Data'

const Context = React.createContext();

export class Provider extends Component{
    constructor(){
        super();
        this.data = new Data();
    }
    render(){
        const value = {
            data: this.data,
        }
        return(
            <Context.Provider value={value}>
                           
            </Context.Provider>
        )
    }
}