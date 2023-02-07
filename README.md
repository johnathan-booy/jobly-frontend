# Jobly - The One-Stop Job Shop

[Check out the deployed app!](http://jobly.johnathan-booy.surge.sh/)

Jobly is a web-based job listing and job application platform. It provides a simple and user-friendly interface for job seekers to browse and apply to available job listings, and for companies to post and manage their job listings. The platform is built using modern web technologies, such as React, Node.js, and PostgreSQL, to provide a smooth and responsive user experience.

## Backend

The backend API for Jobly is a powerful and efficient solution, built using Express.js and deployed on Heroku. It provides the backbone for all company, job, and user-related requests, including authentication.

[View on Github](https://github.com/johnathan-booy/jobly-backens)


## Custom Hooks

Jobly uses two custom hooks, `useFlashMessages` and `useLocalStorage`. 

`useFlashMessages` is a hook that returns the current flash messages and a function to add new flash messages with a specified timeout. 

`useLocalStorage` is a hook that allows for storage and retrieval of values from local storage in a React component. It is utilized to keep users signed in and authenticated.

## Forms and validation

The `<GenericForm`> component and FormFields class in Jobly utilize the power of Yup and Formik to create clean, dynamic forms with built-in validation.

By using these tools, Jobly reduces code duplication and streamlines the form creation process, resulting in a more efficient and scalable application.

With Yup and Formik, Jobly is able to ensure data entered into forms is accurate and complete, improving the user experience and reducing the chance of errors


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
