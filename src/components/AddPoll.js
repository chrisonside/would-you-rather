import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/app.scss';

import {
  saveQuestion,
} from '../actions';

/*
  * This form is based on techniques mentioned in 2 different articles:
  * https://redux-form.com/6.7.0/examples/simple/
  * https://scotch.io/tutorials/managing-form-state-in-react-with-redux-form
*/

/*
  * Validate form values
*/
const validate = val => {
  const errors = {};
  if (!val.optionOne) {
    errors.optionOne = 'Please enter an option here';
  }
  if (!val.optionTwo) {
    errors.optionTwo = 'Please enter an option here';
  }
  // Useful for debugging
  // console.log(errors);
  return errors;
}

/*
  * Function to render inputs for form
*/
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='form__entry'>
    <label className='form__label'>{label}</label>
    <input className='form__input-box' {...input} type={type}/>
    {touched && ((error && <div className='form__error'>{error}</div>) || (warning && <span>{warning}</span>))}
  </div>
)

class AddPoll extends Component {
  /*
    * Handle form values input by user and dispatch action to add post to server
  */
  handleFormValues = (values) => {
    const question = {};
    question.optionOneText = values.optionOne;
    question.optionTwoText = values.optionTwo;
    question.author = this.props.loggedInUser.id;
    this.props.saveQuestion(question);
  };

  render() {

    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = this.props;

    return (
      <div>
        {(submitSucceeded) && (
          <Redirect to='/' />
        )}
        {/* Object that includes the following properties: author, optionOneText, and optionTwoText */}
        {(!submitSucceeded) && (
           <form className='form' onSubmit={handleSubmit(this.handleFormValues)}>
            <h1 className='form__title'>Add a new poll</h1>
            <h2 className='form__sub-title'>Would you rather:</h2>
            <div className='form__field'>
              <Field name='optionOne' component={renderField} type='text' label='Option one'/>
            </div>
            <div className='form__field'>
              <Field name='optionTwo' component={renderField} type='text' label='Option two'/>
            </div>
            <div>
              <button className='form__submit' type='submit' disabled={pristine || submitting}>Submit</button>
              <button className='form__clear' type='button' disabled={pristine || submitting} onClick={reset}>
                Clear
              </button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

function mapStateToProps( {loggedInUser} ) {
  return {
    loggedInUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveQuestion: (question) => dispatch(saveQuestion(question)),
  }
}

AddPoll = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPoll);

// Hook our form up to the store
export default reduxForm({
  form: 'AddPoll', // unique identifier for form
  validate,
})(AddPoll)