import React from 'react';
import Card from 'react-bootstrap/Card';


class Movie extends React.Component{
  render() {
    return(
    this.props.cityMovie.map((info, idx) => {
      return  (
        <SingleMovie 
          key={idx}
          movie={info}
        />
      )
    })
  )}
}


class SingleMovie extends React.Component {
  render() {

    return (
      <Card>
        <Card.Text>Title: {this.props.movie.title}</Card.Text>
        <Card.Text>Overview: {this.props.movie.overview}</Card.Text>
        <Card.Text>Average Votes: {this.props.movie.average_votes}</Card.Text>
        <Card.Text>Total Votes: {this.props.movie.total_votes}</Card.Text>
        <Card.Text>Popularity: {this.props.movie.popularity}</Card.Text>
        <Card.Text>Released: {this.props.movie.released_on}</Card.Text>
        <Card.Img
          src={`https://image.tmdb.org/t/p/w500${this.props.movie.image_url}`}
        />
      </Card>
    )
  }
}

export default Movie;