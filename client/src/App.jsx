import React from 'react';
import Photo from './components/Photo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      photos: [],
      newPhotos: [],
      loading: false,
    }
  }

  componentDidMount() {
    document.body.classList.toggle('home');
    window.addEventListener('scroll', this.handleScroll);
    this.handleRequest();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.setState({
        page: this.state.page + 1,
        showLoading: true,
      })
      //Delay handleRequest, for smoother loading.
      setTimeout(
        function () {
          this.handleRequest();
        }.bind(this),
        500);
    }
  }

  /**
   * Helper function to retreive photos data
   * from node module.
   */
  handleRequest() {
    //If we are already loading photos- step out of function.
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true,
    })
    fetch('/get-recent&page=' + this.state.page)
      .then((response) => {
        if (!response.ok) {
          console.log('Failed to get photos.');
          return;
        }
        return response.json();
      })
      .then((photos) => {
        if (!photos) {
          return;
        }
        this.setState({
          page: this.state.page + 1,
          photos: [...this.state.photos, ...photos],
          newPhotos: photos,
          loading: false,
        })
      });
  }

  renderPhotos() {
    return !!this.state.photos.length && (
      this.state.photos.map((photo) =>
        <Photo
          key={photo.id}
          id={photo.id}
          farm={photo.farm}
          title={photo.title}
          secret={photo.secret}
          server={photo.server}
        />
      )
    );
  }

  render() {
    return !!this.state.photos.length && (
      <div className="home-content wrapper">
        <div className="greeting">
          <h1>Image scroll view</h1>
          <h2>Task for Zenitech</h2>
          <p>Showing 10 photos per page.</p>
        </div>
        {this.renderPhotos()}
      </div>
    );
  }
}

export default App;

