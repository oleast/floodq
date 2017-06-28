import React, { Component } from 'react'

export default class Body extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }

        this.skeleFunction =  this.skeleFunction.bind(this)
    }

    skeleFunction() {
        
    }

    render() {
        return (
            <div></div>
        )
    }
}