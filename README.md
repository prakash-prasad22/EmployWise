# EmployWise User Management App

This React application integrates with the Reqres API to provide user authentication and management functionalities.

## Table of Contents

* [Assignment Overview](#assignment-overview)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Running the Application](#running-the-application)
* [Error Handling](#error-handling)
* [Validation](#validation)
* [Persistence](#persistence)
* [Navigation](#navigation)
* [Bonus Features](#bonus-features)
* [Author](#author)
* [Live Demo](#live-demo)

## Assignment Overview

This project fulfills the EmployWise assignment requirements by creating a React application that interacts with the Reqres API to manage users. The application includes user authentication, user listing with pagination, and user editing/deletion features. 

## Features

* **User Authentication:** Users can log in using provided credentials. 
* **User Listing:** Displays a paginated list of users with their first name, last name, and avatar.
* **Edit User:** Allows users to update user details (first name, last name, email). 
* **Delete User:** Enables users to delete user records. 
* **Search and Filtering:** Implements client-side search to filter users by name or email. 
* **Navigation:** Uses React Router for smooth navigation between pages. 
* **Error Handling:** Displays user-friendly error messages for API and form validation errors. 
* **Responsive Design:** The UI is designed to be responsive and work across various devices. 

## Technologies Used

* React
* React Router
* React Toastify
* Tailwind CSS
* Fetch API

## Prerequisites

* Node.js and npm installed

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/prakash-prasad22/EmployWise
    ```
2.  Navigate to the project directory:

    ```bash
    cd EmployWise
    ```
3.  Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

1.  Start the development server:

    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173`

## Error Handling

* The application displays error messages using `react-toastify` for API requests and form submissions. 
* Error messages are displayed to the user in a clear and concise manner.

## Validation

* Basic form validation is implemented in the login and edit user components to ensure required fields are filled. 
## Persistence

* The login token is stored in `localStorage` upon successful login to maintain user sessions. 

## Navigation

* React Router is used for client-side navigation between the login, user list, and edit user pages. 

## Bonus Features

* Client-side search and filtering of users by first name, last name, or email is implemented. 
## Author

Prakash Prasad Rai

## Live Demo 

https://employwise-production.netlify.app/login
