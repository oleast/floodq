import React, { Component } from 'react'
import { Input, Segment, Button, Icon, Divider, Grid } from 'semantic-ui-react'
import axios from 'axios'

import Result from './Result'

export default class Body extends Component {

    constructor (props) {
        super(props)

        this.state = {
            results: [],
            query: '',
            loading: false,
            provider: 'rarbg',
            media: 'movies'
        }

        this.apiSearch =  this.apiSearch.bind(this)
        this.formChange = this.formChange.bind(this)
    }

    formChange (e, {value}) {
        console.log(value)
        this.setState({
            query: value
        })
    }

    apiSearch () {
        console.log('Searching with: ' + "/api/" + this.state.provider + "/" + this.state.media + "?query='" + this.state.query + "'")
        if (this.state.query.length) {
            this.setState({
                loading: true
            })
            axios
                .get("/api/" + this.state.provider + "/" + this.state.media + "?query='" + this.state.query + "'")
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        results: res.data,
                        loading: false
                    }, () => {
                        console.log(this.state.results)
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    render() {
        return (
            <div>
                <Input
                    placeholder='Search...'
                    onChange={this.formChange}
                    size='large'
                    fluid
                    action={
                        <Button floated='right' onClick={this.apiSearch} size='large'>
                            <Icon name='search' />
                        </Button>
                    }
                />
                <Divider hidden />
                <Segment.Group>
                    {
                        this.state.loading ?
                        <Dimmer active>
                            {this.state.results.map((result) => { return <Result key={result.download} result={result} />})}
                            <Loader />
                        </Dimmer> :
                        this.state.results.map((result) => { return <Result key={result.download} result={result} />})
                    }
                </Segment.Group>
            </div>
        )
    }
}