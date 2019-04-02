import React from 'react';

class Sorter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: 'Sort photos alphabetically!'
    }
  }

  sortPhotos() {
    this.props.photos.sort(function(a, b) {
      var aTitle = a.title.toUpperCase();
      var bTitle = b.title.toUpperCase();
      return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
    })
    //Send sorted photos to parent App.
    this.props.sendSortedPhotos(this.props.photos);
    this.setState({
      btnText: 'All sorted!'
    })
  }

  render() {
    return(
      <div
        className = "sorter"
        onClick= { this.sortPhotos.bind(this) }>
        { this.state.btnText }
        </div>
    );
  }
}

export default Sorter;

