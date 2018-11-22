import * as API from '../data/_DATA.js';
import { isObjectEmpty } from '../utils/helper.js';

// Set up constants - these are exported to reducers
export const SET_USERS = 'SET_USERS';
export const SET_ALL_QUESTIONS = 'SET_ALL_QUESTIONS';
export const SET_ANSWERED_QUESTIONS = 'SET_ANSWERED_QUESTIONS';
export const SET_UNANSWERED_QUESTIONS = 'SET_UNANSWERED_QUESTIONS';
export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_ANSWER  = 'SAVE_ANSWER';
export const SET_CURRENT_POLL_ID = 'SET_CURRENT_POLL_ID';
export const CLEAR_CURRENT_POLL = 'CLEAR_CURRENT_POLL';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_VOTE = 'ADD_VOTE';
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS';
export const UPDATE_QUESTION_VOTES = 'UPDATE_QUESTION_VOTES';

/*
  *
  * All thunk action creators utilise this particular action creator to speak to the reducers
  *
*/
export const updateReduxStore = (payload, type) => ({
  payload,
  type
});

// Export thunked up action creators for use by components - using thunk releases redux from its synchronous confines
export const getUsers = () => dispatch => (
  API
  ._getUsers()
  .then(users => dispatch(updateReduxStore(users, SET_USERS)))
);

export const collateUserAnswers = (user) => dispatch => (
  API
  ._getQuestions()
  .then(questions => {
    const answeredQuestions = {};
    const unAnsweredQuestions = {};
    // Loop through questions
    for (var question in questions) {
      // For each question (E.g. 8xf0y6ziyjabvozdd253nd)
      if (questions.hasOwnProperty(question)) {
        // If user has answered question, add question to user's answered object
        if(user.answers[question]) {
          answeredQuestions[question] = questions[question];
        } else {
          // Else add question to user's unanswered object
          unAnsweredQuestions[question] = questions[question];
        }
      }
    }
    dispatch(updateReduxStore(questions, SET_ALL_QUESTIONS));
    dispatch(updateReduxStore(answeredQuestions, SET_ANSWERED_QUESTIONS));
    dispatch(updateReduxStore(unAnsweredQuestions, SET_UNANSWERED_QUESTIONS));
  })
);

export const addCurrentUser = (user) => dispatch => (
  dispatch(updateReduxStore(user, ADD_CURRENT_USER))
);

export const setCurrentPollId = (pollId) => dispatch => (
  dispatch(updateReduxStore(pollId, SET_CURRENT_POLL_ID))
);

export const clearCurrentPoll = () => dispatch => (
  dispatch(updateReduxStore({}, CLEAR_CURRENT_POLL))
);

/*
  * Method to add new poll question
  * As we are spoofing a database, simply adds question to the app's javaScript memory
*/
export const saveQuestion = (question) => dispatch => (
  API
  ._saveQuestion(question)
);
// OK UP TO HERE _ NEED TO NOT USE APP MEMORY BUT USE REDUX STORE AS PER THE INSTRUCTIONS! MAKE IT EXPLICIT AND EDIT PREV METHOD THAT RELIES ON APP MEMORY (collateUserAnswers)
// ACTUALLY SCREW THAT!!! THE API DATABASE RETURNS NOTHING, AS OPPOSED TO THE  (collateUserAnswers) which did and so worked just fine lol

// users = {
// tylermcginnis: {
//   id: 'tylermcginnis',
//   answers: {
//     "vthrdm985a262al8qx3do": 'optionOne',
//     "xj352vofupe1dqz9emx13r": 'optionTwo',
//   },

  // questions = {
  //   "8xf0y6ziyjabvozdd253nd": {
  //     id: '8xf0y6ziyjabvozdd253nd',
  //     optionOne: {
  //       votes: ['sarahedo'],


/*
  * Vote in poll
  * As spoofing a database, adds vote to the app's javaScript memory
*/
export const saveVote = (vote) => dispatch => (
  API
  ._saveQuestionAnswer(vote).then(() => {
    dispatch(updateReduxStore(vote, UPDATE_USER_ANSWERS));
    dispatch(updateReduxStore(vote, UPDATE_QUESTION_VOTES));
  })
);