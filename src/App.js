import React from 'react'
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Imageform from "./components/Imageform/Imageform"
import Rank from "./components/Rank/Rank"
import Facerecognition from "./components/Facerecognition/Facerecognition"
import Signin from "./components/Signin/Signin"
import Register from "./components/Register/Register"
//import Clarifai from "clarifai"

/*const app = new Clarifai.App({
  apiKey: '1ef3179ace574b09a10f27fa14f1fa01'
 });*/


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false,
      users: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
      
    }
  }

   componentDidMount () {
   fetch("http://localhost:3000")
   .then(response => response.json())
    .then(data => console.log(data))
  } 

  loadUser = (user) => {
    this.setState({
      users: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  calculateFaceLocation = (response) => {
    console.log(response);
    
    const data = response.outputs[0].data.regions[0].region_info.bounding_box
    const img = document.getElementById("img");
    const left = data.left_col * Number(img.width)
    const top = data.top_row * Number(img.height)
    const right = Number(img.width) - (data.right_col * Number(img.width))
    const bottom = Number(img.height) - (data.bottom_row * Number(img.height))

    return {
      leftCol: left,
      rightCol: right,
      topRow: top,
      bottomRow: bottom
    }
  }

  displayFaceBox = (box) => {
    
    this.setState({box: box})
  } 

  onInputChange = (e) => {
    
    this.setState({input: e.target.value})
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})

  }

  onButtonSubmit = () => {
    
    this.setState({imageUrl: this.state.input});


   /*app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '174702155a6043c9932b045e8e00e6e2',
        type: 'visual-detector',
      },
      this.state.input      
    ).*/
    fetch("http://localhost:3000/imageurl", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(res => res.json())
    .then(response => {
      if(response) {
        fetch("http://localhost:3000/image", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.users.id
          })
        }).then(response => response.json())
        .then(count=> {
          this.setState(Object.assign(this.state.users, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));}



  render() {

    return (
    <div className="App">

  <ParticlesBg type="cobweb" bg={true} />

      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      { this.state.route === 'home'?
      <div>
      <Logo />
      <Rank user={this.state.users} />
      <Imageform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <Facerecognition face={this.state.box} imageUrl={this.state.imageUrl} />
    </div>
       : (this.state.route === 'signin'? 
       <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
       : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)}
    </div>
  )
  };
}

export default App;
