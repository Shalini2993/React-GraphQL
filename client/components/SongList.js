import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import query from '../queries/fetchSongs'

class SongList extends Component {

  onSongDelete(id) {
    console.log(id)
    this.props.mutate(
      { variables: { id } }
    ).then(() => this.props.data.refetch())
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      console.log(id)
      return (
        <li key={id} className="collection-item">
          {title}
          <i className='material-icons' onClick={() => this.onSongDelete(id)}>delete</i>
        </li>
      )
    })
  }
  render() {
    if (this.props.data.loading) return (<div>Loading...</div>)
    return (
      <div>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}


const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(graphql(query)(SongList))
