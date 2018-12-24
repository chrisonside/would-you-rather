import * as API from '../data/_DATA.js';

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
export const UPDATE_QUESTION_VOTES = 'UPDATE_QUESTION_VOTES';
export const UPDATE_LOGGEDIN_USER_ANSWERS = 'UPDATE_LOGGEDIN_USER_ANSWERS';
export const UPDATE_LOGGEDIN_USER_QUESTIONS = 'UPDATE_LOGGEDIN_USER_QUESTIONS';

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
  * As we are spoofing a database, this method simply adds the new question to the app's javaScript memory
  * Note that after calling this action, the AddPoll component redirects to root page afterwards
  * (and redirecting to the root page measn the PollList Component calls the collateUserAnswers action)
*/
export const saveQuestion = (question) => dispatch => (
  API
  ._saveQuestion(question)
  .then(savedQuestion => {
    dispatch(updateReduxStore(savedQuestion, UPDATE_LOGGEDIN_USER_QUESTIONS))
  })
);

/*
  * Vote in poll
  * As we are spoofing a database, the _saveQuestionAnswer method adds the vote to the app's javaScript memory
  * If this was a real app, we'd save this vote to a real database
*/
export const saveVoteToDb = (vote) => dispatch => (
  API
  ._saveQuestionAnswer(vote)
);
/*
  * We also need to update the Redux store
*/
export const saveVoteInStore = (vote) => dispatch => (
  dispatch(updateReduxStore(vote, UPDATE_LOGGEDIN_USER_ANSWERS)),
  dispatch(updateReduxStore(vote, UPDATE_QUESTION_VOTES))
);

export const signOut = () => dispatch => (
  dispatch(updateReduxStore({}, ADD_CURRENT_USER)),
  dispatch(updateReduxStore({}, SET_ALL_QUESTIONS)),
  dispatch(updateReduxStore({}, SET_ANSWERED_QUESTIONS)),
  dispatch(updateReduxStore({}, SET_UNANSWERED_QUESTIONS)),
  dispatch(updateReduxStore(null, SET_CURRENT_POLL_ID))
);