import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isArrayEmpty } from '../utils/helper';

import {
  getUsers,
  addCurrentUser,
} from '../actions';

class SignIn extends Component {

  constructor (props) {
    super(props);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  // Populate users data in Redux Store, triggering a rerender of this Component
  componentDidMount() {
    this.props.getUsers();
  }

  handleUserSelection(e) {
    const userNameSelected = e.target.getAttribute('data-user');
    const userDetails = this.props.usersObject[userNameSelected];
    this.props.addCurrentUser(userDetails);
  }

  render() {
    const { usersArray } = this.props;

    return (
      <div>
        {!isArrayEmpty(usersArray) && (
         <div className='signin'>
          <p className='signin__label'>Hi! Please log in:</p>
          <div className='signin__users'>
            {usersArray.map((user, index) => (
              <div key={ `${user.name}-${index}`} className='signin__user'>
                <div className='signin__avatar-placeholder'>
                  <img className='signin__avatar' src={user.avatarURL} alt={user.name} />
                </div>
                <h2 className='signin__name'>{user.name}</h2>
                <div className='signin__click' data-user={user.id} onClick={this.handleUserSelection}></div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    );
  }
}

function mapStateToProps( {users} ) {
  /*  Convert users from Redux store's object format to an array, for easy looping over in UI */
  let usersArray = null;
  if(!isArrayEmpty(users)) {
    let objectKeys = [Object.keys(users)];
    usersArray = [];
    objectKeys[0].map((objKey) => {
      return usersArray.push(users[objKey]);
    });
  }

  return {
    usersArray: usersArray,
    usersObject: users
  }

}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    addCurrentUser: (user) => dispatch(addCurrentUser(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);