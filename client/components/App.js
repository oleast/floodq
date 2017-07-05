import React, { Component } from 'react'
import { Container } from 'semantic-ui-react' 

import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <div>
                <Header pageName='FloodQ'/>
                <Container>
                    <Body />
                </Container>
                <Footer />
            </div>
        )
    }
}