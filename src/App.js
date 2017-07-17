import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth0Lock from 'auth0-lock';
import Github from './Github';
import Header from './components/Header';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID: '7hyFgLkCG4BTBdnbyFcziRKC3TitMTT2',
    domain: 'enlightened.auth0.com'
  }

  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }

        // console.log(profile);
        this.setProfile(authResult.idToken, profile);

      });
    });
    this.getProfile();
  }

  setProfile(idToken, profile) {

    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile() {
    if(localStorage.getItem('idToken') != null) {
      this.setState({
        idToken: localStorage,
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }

  logout() {
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  showLock() {
      this.lock.show();
  }

  render() {
    let git;

    if(this.state.idToken) {
      git = <Github />
    }
    else {
      git = "Click on Login to view Github Viewer";
    }
    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          onLogin={this.showLock.bind(this)}
          onLogout={this.logout.bind(this)}
         />
        {git}
      </div>
    );
  }
}

export default App;
