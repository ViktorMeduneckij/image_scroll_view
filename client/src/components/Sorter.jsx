import React from 'react';

class Sorter extends React.Component {
  sortPhotos() {
    this.props.photos.sort(function(a, b) {
      var aTitle = a.title.toUpperCase();
      var bTitle = b.title.toUpperCase();
      return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
    })
    //Send sorted photos to parent App.
    this.props.sendSortedPhotos(this.props.photos);
  }

  render() {
    return(
      <div
        className = "sorter"
        onClick= { this.sortPhotos.bind(this) }>
        Sort photos alphabetically!
        </div>
    );
  }
}

export default Sorter;

