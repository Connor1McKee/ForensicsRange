import logo from './logo.svg';
import './App.css';
import {API, Auth} from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

function App() {
  async function callHelloWorld() {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    console.log({ token })

    const requestInfo = {
      headers: { Authorization: token }
    }

    const data = await API.get('forensicsrangeapi', '/hello', requestInfo)
    console.log({ data })
  }

  async function callTest() {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    const group = user.signInUserSession.idToken.payload['cognito:groups']
    console.log({ group })
    console.log({ token })

    const requestInfo = {
      headers: { Authorization: token }
    }

    const data = await API.get('forensicsrangeapi', '/test', requestInfo)
    console.log({ data })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={callHelloWorld}> Call Hello World </button>
        <button onClick={callTest}> Call Test Message </button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
