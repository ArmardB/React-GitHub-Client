import React, {Component} from 'react';
import Profile from './components/Profile';
import Search from './components/Search';

const API ='https://api.github.com/users';

class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      userName: 'armardb',
      name: '',
      avator: '',
      repos: '',
      followers: '',
      following: '',
      homeUrl: ''
    };
  }

  componentDidMount() {
    this.getProfile(this.state.userName);
  }

  getProfile = (username) => {
    let finalUrl = `${API}/${username}`;

    fetch(finalUrl)
      .then((res) => {
        res.json();
      }).then((data) => {
        this.setState({
          userName: data.login,
          name: data.name,
          avator: data.avatar_url,
          repos: data.public_respos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        })
      }).catch((err) => console.log('There was a problem while fetching data: ' + err));
  }

  render(){
    return(
      <div>
          <section id="card">
            <Search />
            <Profile />
          </section>
      </div>
    );
  }
}

export default Github;
