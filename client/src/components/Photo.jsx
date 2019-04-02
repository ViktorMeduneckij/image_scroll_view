import React from 'react';

class Photo extends React.Component {
  render() {
    return(
      <div className="photo-node">
        <div className="photo-wrapper">
          <img src={'https://farm' + this.props.farm + 
            '.staticflickr.com/' + this.props.server + 
            '/' + this.props.id + '_' + this.props.secret + '.jpg' } 
            alt={ this.props.title }
          />
        </div>
        <p> { this.props.title }</p>
      </div>
    );
  }
}

export default Photo;

