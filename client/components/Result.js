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
                    <Grid columns={6} verticalAlign='middle'>
                        <Grid.Column width={8}>
                            <Header as='h4'>
                                {this.props.result.filename}
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button disabled circular size='large'>3.5 GB</Button>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='linkify' fitted circular size='large' />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='linkify' fitted circular size='large' />
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Icon name='linkify' fitted circular size='large' />
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
