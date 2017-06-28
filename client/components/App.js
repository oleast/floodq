import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default class App extends Component {

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
            <div>
                <Header pageName='FloodQ'/>
                <Body />
                <Footer />
            </div>
        )
    }
}