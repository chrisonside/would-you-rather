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
        <h1 className='leaderboard__title'>
          Leaderboard
        </h1>
        {!isArrayEmpty(usersArray) && usersArray.map((user, index) => (
          <div key={index} className={`leaderboard__entry leaderboard__entry--${index}`}>
            {index === 0 &&
              <div className='leaderboard__logo-holder'>
                <img src={ChampionLogo} className='leaderboard__logo' alt='1st place logo'/>
              </div>
            }
            <p className='leaderboard__name'>#{index + 1} {user.name}</p>
            <img className='leaderboard__avatar' src={user.avatarURL} alt={user.name} />
            <div className='leaderboard__stats'>
              <p className='leaderboard__answers'>Questions answered: <span className='leaderboard__figure'>{user.answers}</span></p>
              <p className='leaderboard__questions'>Questions asked: <span className='leaderboard__figure'>{user.questions}</span></p>
              <p className='leaderboard__score'>Total score: <span className='leaderboard__figure'>{user.score}</span></p>
            </div>
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