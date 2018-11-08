import React, { Component } from 'react';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

import Signin from './components/signin/Signin';
import Register from './components/register/Register';

import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

const initialState = {
  imageLink: '',
  faceRegionBoxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component { 
  constructor() {
    super();

    this.state = initialState;
    this.clarifai = new Clarifai.App({
      apiKey: '5533bbd988e64868a9810399ab3f4698'
    });
  }

  updateUser = (user) => {
    this.setState({user: user})
  }

  onImageLinkChange = (event) => {
    this.setState({
      faceRegionBoxes: [],
      imageLink: event.target.value
    });
  }

  onDetectClick = (event) => {
    this.clarifai.models.predict(
        "a403429f2ddf4b49b307e318f00e528b", this.state.imageLink)
        .then(response => {
            if(response) {
                fetch('http://localhost:3000/entry/' + this.state.user.id, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => resp.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}));
                });
            }

            this.displayFaceBox(this.calculateFaceLocation(response))
        })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'home')
      this.setState({isSignedIn: true});
    else if(route === 'signout') {
      this.setState(initialState);
    }

    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
    const faceRegions = data.outputs[0].data.regions;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    const boxes = faceRegions.map(region => {
    const faceRegion = region.region_info.bounding_box;

    return {
        id: region.id,
        leftCol: faceRegion.left_col * width,
        topRow: faceRegion.top_row * height,
        rightCol: width - (faceRegion.right_col * width),
        bottomRow: height - (faceRegion.bottom_row * height)
      };
    });

    return boxes; 
  }

  displayFaceBox = (boxes) => {
    this.setState({faceRegionBoxes: boxes});
  }

  render() {
    const output = [];

    if(this.state.route === 'signin') {
      output.push(<Signin key='signin' onRouteChange={this.onRouteChange} updateUser={this.updateUser} />);
    }

    else if(this.state.route === 'register') {
      output.push(<Register key='register' onRouteChange={this.onRouteChange} updateUser={this.updateUser} />);
    }

    else {
        output.push(<Rank key='rank' user={this.state.user}/>);
        output.push(<ImageLinkForm key='imageLinkForm'
          onInputChange={this.onImageLinkChange} 
          onButtonSubmit={this.onDetectClick}
        />);
        output.push(<FaceRecognition key='faceRecognition' faceRegionBoxes={this.state.faceRegionBoxes} imgSrc={this.state.imageLink} />);
    }

    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        <Logo />
        {output}
      </div>
    );
  }
}

export default App;
