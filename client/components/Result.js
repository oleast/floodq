import React, { Component } from 'react'
import { Divider, Button, Icon, Grid, Header, Loader } from 'semantic-ui-react'
import axios from 'axios'

export default class Result extends Component {

    constructor (props) {
        super(props)

        this.state = {
            extra: false,
            extraInfo: {
                texted_language: '',
                spoken_language: '',
                size: '',
                date: '',
                files: '',
                description: ''
            }
        }

        this.toggleExtra = this.toggleExtra.bind(this)
        this.getExtra = this.getExtra.bind(this)
    }

    getExtra () {
        const string = '/api/tpb/torrent?query=' + this.props.result.info_link
        axios
            .get(string)
            .then((res) => {
                this.setState({
                    extraInfo: res.data
                }, () => {
                    console.log(this.state.extraInfo)
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    toggleExtra () {
        console.log('Toggle extra: ' + !this.state.extra)
        this.setState({
            extra: !this.state.extra
        }, () => {
            if (this.state.extra) {
                this.getExtra()
            }
        })
    }

    render() {
        return (
            <div>
                <Divider />
                <Grid verticalAlign='middle'>
                    <Grid.Row verticalAlign='middle' only='computer'>
                        <Grid.Column width={8}>
                            <Header as='h4'>
                                { this.props.result.name }
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button floated='right' disabled circular size='large'>{ this.props.result.size }</Button>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button floated='right' disabled basic circular size='large' color='green'> { this.props.result.seeders } </Button>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Button floated='right' disabled basic circular size='large' color='red'> { this.props.result.leechers } </Button>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <a href={this.props.result.magnet}>
                                <Icon floated='right' name='linkify' fitted circular size='large' />
                            </a>
                        </Grid.Column>
                        { this.state.extra ?
                            <Grid.Column width={1}>
                                <Icon floated='right' name='expand' color='blue' fitted circular size='large' onClick={ this.toggleExtra }/>
                            </Grid.Column> :
                            <Grid.Column width={1}>
                                <Icon floated='right' name='expand' fitted circular size='large' onClick={ this.toggleExtra }/>
                            </Grid.Column>
                        }
                    </Grid.Row>
                    <Grid.Row columns={1} verticalAlign='middle' only='mobile tablet'>
                        <Grid.Column width={16}>
                            <Header as='h4'>
                                { this.props.result.name }
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={5} verticalAlign='middle' only='mobile tablet'>
                        <Grid.Column width={5}>
                            <Button disabled circular size='large'>{ this.props.result.size }</Button>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button float='right' disabled basic circular size='large' color='green'> { this.props.result.seeders } </Button>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Button float='right' disabled basic circular size='large' color='red'> { this.props.result.leechers } </Button>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <a href={this.props.result.magnet}>
                                <Icon name='linkify' fitted circular size='large' />
                            </a>
                        </Grid.Column>
                        { this.state.extra ?
                            <Grid.Column width={2}>
                                <Icon float='right' name='expand' color='blue' fitted circular size='large' onClick={ this.toggleExtra }/>
                            </Grid.Column> :
                            <Grid.Column width={2}>
                                <Icon float='right' name='expand' fitted circular size='large' onClick={ this.toggleExtra }/>
                            </Grid.Column>
                        }
                    </Grid.Row>
                </Grid>
                { this.state.extra ?
                    this.state.extraInfo.size.length || this.state.extraInfo.files.length || this.state.extraInfo.date.length ?
                        <div>
                            <p>Texted Language: { this.state.extraInfo.texted_language }</p>
                            <p>Spoken Language: { this.state.extraInfo.spoken_language }</p>
                            <p>Size (bytes): { this.state.extraInfo.size }</p>
                            <p>Date: { this.state.extraInfo.date }</p>
                            <p>User: { this.props.result.user } : { this.props.result.user_status }</p>
                            <p>{ this.props.description }</p>
                        </div> :
                        <div>
                            <Loader active inline />
                        </div>
                    : undefined
                }
            </div>
        )
    }
}
