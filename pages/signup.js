import Layout from '../components/MyLayout'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const MyTextField = styled(TextField)({
  marginLeft: 8,
  marginRight: 8,
  width: 200,
});

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '', 
        name: '', 
        password: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const name = target.name;
      this.setState({
        [name]: target.value
      });
    }

  
    handleSubmit(event) {
      alert('Username: ' + this.state.username + '\n' +
            'Full Name: ' + this.state.name + '\n' +
            'Password: ' + this.state.password + '\n'
      );
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <MyTextField
          required
          name="username"
          id="standard-required"
          label="Username"
          value = {this.state.username}
          onChange={this.handleChange}
          margin="normal"
          />
          
          <MyTextField
          required
          name="name"
          id="standard-required"
          label="Full Name"
          value = {this.state.name}
          onChange={this.handleChange}
          margin="normal"
          />

          <MyTextField
          required
          name="password"
          id="standard-password-input"
          label="Password"
          type="password"
          value = {this.state.password}
          onChange={this.handleChange}
          margin="normal"
          />
          
          <Button type="submit" variant="contained">
            Submit
          </Button>
            
        </form>
      );
    }
}

export default function SignUp() {
    return (
        <Layout>
          <NameForm />
        </Layout>
        
    )
}
