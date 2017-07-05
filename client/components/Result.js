import React, { Component } from 'react'
import { Segment, Button, Icon, Grid, Header } from 'semantic-ui-react'

export default class Result extends Component {

    constructor (props) {
        super(props)

        this.state = {
            thing: undefined
        }
    }

    render() {
        return (
            <div>
                <Segment compact>
                    <Grid columns={2} verticalAlign='middle'>
                        <Grid.Column width={15}>
                            <Header as='h4'>
                                {this.props.result.filename}
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <a href={this.props.result.download}>
                                <Icon name='linkify' fitted circular size='large' />
                            </a>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}
