import React, { Component } from 'react'
import { Input, Segment, Button, Icon, Divider, Grid, Select, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'

import Result from './Result'

const mediaTypes = [
    { key: 'tvshows', text: 'TV', value: 'tvshows' },
    { key: 'movies', text: 'Movies', value: 'movies' }
]

const providers = [
    { key: 'rarbg', text: 'RARBG', value: 'rarbg' },
    { key: 'tpb', text: 'The Pirate Bay', value: 'tpb' }
]

export default class Body extends Component {

    constructor (props) {
        super(props)

        this.state = {
            results: [],
            query: '',
            loading: false,
            provider: providers[0].value,
            media: 'movies',
            page: 0
        }

        this.apiSearch =  this.apiSearch.bind(this)
        this.formChange = this.formChange.bind(this)
        this.setProvider = this.setProvider.bind(this)
        this.setMediaType = this.setMediaType.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    formChange (e, {value}) {
        console.log(value)
        this.setState({
            query: value
        })
    }

    apiSearch (e, page) {
        const string = "/api/" + this.state.provider + "/" + this.state.media + "?query=" + this.state.query + "&page=" + this.state.page
        console.log('Searching with: ' + string)
        if (this.state.query.length) {
            this.setState({
                loading: true
            })
            if (!page) {
                page = 0
            }
            axios
                .get(string)
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

    setProvider (event, selected) {
        console.log(selected)
        this.setState({
            provider: selected.value
        })
    }

    setMediaType (event, selected) {
        console.log(selected)
        this.setState({
            mediaType: selected.value
        })
    }

    loadMore () {
        this.setState({
            page: this.state.page++
        }, () => {
            apiSearch(this.state.page)
        })
    }

    render() {
        return (
            <div>
                <Input
                    placeholder='Search...'
                    onChange={this.formChange}
                    size='large'
                    fluid
                    action
                >
                    <input />
                    <Select compact options={providers} defaultValue={providers[0].value} onChange={this.setProvider} />
                    <Select compact options={mediaTypes} defaultValue={mediaTypes[0].value} onChange={this.setMediaType}/>
                    <Button floated='right' onClick={this.apiSearch} size='large'>
                        <Icon name='search' />
                    </Button>
                </Input>
                <Divider hidden />
                { this.state.results.length ? 
                    <Segment.Group>
                        {this.state.results.map((result) => { return <Result key={result.download} result={result} />})}
                    </Segment.Group> : undefined
                }
                { this.state.loading ?
                    <Loader /> : undefined
                }
                <Button floated='middle' onClick={this.apiSearch} size='large'>Load More</Button>
            </div>
        )
    }
}