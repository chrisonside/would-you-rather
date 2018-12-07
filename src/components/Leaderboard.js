import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjectEmpty } from '../utils/helper';
import { isArrayEmpty } from '../utils/helper';
import ChampionLogo from '../assets/champion-icon.png';

class Leaderboard extends Component {

  render() {
    const { usersArray } = this.props;

    return (
      <div className='leaderboard'>
        <h1>
          Leaderboard
        </h1>
        {!isArrayEmpty(usersArray) && usersArray.map((user, index) => (
          <div key={index} className={index}>
            {index === 0 &&
              <div className='leaderboard__logo-holder'>
                <img src={ChampionLogo} className='leaderboard__logo' alt='1st place logo'/>
              </div>
            }
            <p className='leaderboard__name'>{user.name}</p>
            <img className='leaderboard__avatar' src={user.avatarURL} alt={user.name} />
            <p className='leaderboard__answers'>Questions answered: {user.answers}</p>
            <p className='leaderboard__questions'>Questions asked: {user.questions}</p>
            <p className='leaderboard__score'>Total score: {user.score}</p>
          </div>
        ))}
      </div>

    );
  }
}

function convertToArray(object) {
  return Object.keys(object).map(i => object[i]);
}

function mapStateToProps( {users} ) {
  // const sortedUsers = prepData(users);
  let usersArray = [];
  if(!isObjectEmpty(users)) {
    const usersObjClone = JSON.parse(JSON.stringify(users))
    usersArray = convertToArray(usersObjClone);
    usersArray.forEach(function(item, index){
      item.questions = item.questions.length;
      item.answers = Object.keys(item.answers).length;
      item.score = item.questions + item.answers;
    });
    usersArray.sort(function(a, b) {
      return b.score - a.score;
    });
  }

  return {
    usersArray
 }
}

export default connect(
  mapStateToProps,
  null
)(Leaderboard);