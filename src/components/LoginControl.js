import React from 'react'

function UseringGreeting(props) {
  return <h1>Welcome Back!</h1>
}

function GuestGreeting(props) {
  return <h1>Please Sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UseringGreeting />
  }
  return <GuestGreeting />
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  )
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  )
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }
  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }
  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    return (
      <div className='new-component'>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

//Warning Hide
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className='warning'>
      Warning
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true
    };
  }
  handleToggleClick = () => {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    return (
      <div className='new-component'>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide':'Show'}
        </button>
      </div>
    );
  }
}

export default LoginControl;
export {Page};