# Overview

This is a React and Redux app where a user can play the 'Would you rather game'. It was built as part of my coursework for Udacity's [React Developer NanoDegree](https://eu.udacity.com/course/react-nanodegree--nd019) course.

This project has been bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This app uses a data file to represent a fake database, and this data file has methods to allow access to the data.

Users of the app can answer 'would you rather' questions, pose their own questions, toggle between polls they have and haven't answered, compare their answers to other users, and see how they are ranked on the leaderboard of users who have asked/answered the most polls. There is also a very basic login type functionality where the user just needs to select their name from a dropdown upon logging in.

I've added some simple styling to the app using SASS. I also use a few images/icons, from the [Noun Project](), [PlaceKitten](https://placekitten.com), [PlaceBear](https://placebear.com) and [FillMurray](https://www.fillmurray.com).


# To get the project up and running

`npm install`
`npm start`

# Overview of other dependencies (aside from React and Redux)

[react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
The React Loader Spinner is used as a visual cue to the user that data will soon be loaded into the view.

[react-router-dom](https://www.npmjs.com/package/react-router-dom)
React Router DOM is used as the DOM bindings for React Router - React Router is a commonly used routing library for React and makes sure that my app's UI is in sync with the current URL.

[redux-form](https://www.npmjs.com/package/redux-form)
I am using Redux Form (which works well with the React-Redux bindings) to manage my form state in Redux.

[redux-thunk](https://www.npmjs.com/package/redux-thunk)
Redux Thunk middleware is used to release Redux from its synchronous confines, allowing my app to dispatch actions once it has heard back from an API.