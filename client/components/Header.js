import React, { Component } from 'react'
import { Button, Menu, Icon, Container } from 'semantic-ui-react'

export default class Header extends Component {

    constructor (props) {
        super(props)

        this.state = {
            pageName: 'FloodQ'
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable>
                <Container>
                <Menu.Item>
                    <Icon disabled name='search' /> {this.props.pageName}
                </Menu.Item>
                <Menu.Item
                    name='features'
                    active={activeItem === 'features'}
                    onClick={this.handleItemClick}
                    >
                    <a href="/stuff">Stuff</a>
                </Menu.Item>
                <Menu.Item
                    name='features'
                    active={activeItem === 'features'}
                    onClick={this.handleItemClick}
                    >
                    Info
                </Menu.Item>

                <Menu.Item
                    name='testimonials'
                    active={activeItem === 'testimonials'}
                    onClick={this.handleItemClick}
                    >
                    Other
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item
                        name='sign-in'
                        active={activeItem === 'sign-in'}
                        onClick={this.handleItemClick}
                        >
                        <Button primary>
                            Sign in
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}

