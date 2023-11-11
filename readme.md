# PostYourThoughts

PostYourThoughts is a web application that allows users to register and log in. After logging in, users can share their thoughts by using the "Add Thoughts" form. Users also have access to a page where they can view, edit, and delete their uploaded thoughts. If a user does not have an account, they can only view other people's thoughts and cannot post their own.

## Features

- **User Registration**: Users can create an account by registering with their name, email, and password.
- **User Login**: Registered users can log in using their email and password.
- **Add Thoughts**: Logged-in users can share their thoughts by providing a title and content through the "Add Thoughts" form.
- **View Thoughts**: Users can view their own thoughts as well as thoughts shared by others.
- **Edit Thoughts**: Users can edit their own thoughts.
- **Delete Thoughts**: Users can delete their own thoughts.

## Technologies Used

- React for the frontend.
- Node.js and Express for the backend.
- MongoDB for the database.
- User authentication with JWT (JSON Web Tokens).
- Toast notifications for feedback to the user.
- React Router for navigation.
- Responsive and user-friendly design.

## Usage

1. Clone the repository.
   ```bash
   git clone https://github.com/your-username/PostYourThoughts.git

    ```

2. Create a .env file in both the client and server folder
    - In server's .env file include MONGO_URI and JWT_SECRET (mandatory)
    - In client's .env file include REACT_APP_BACKEND_URL 

2. Install the dependencies.
    ```bash

    cd PostYourThoughts/client
    npm i

    cd ../server
    npm i
    ```
3. Start the development server.

    ```bash
        cd server
        npm run dev
    ```
4. Start React App
    ```bash
        cd client
        npm start
    ```
5. Access the application at http://localhost:3000.



# How to Contribute

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the project.
- Create a new branch for your feature or bug fix.
- Make your changes and test them thoroughly.
- Commit your changes.
- Push to your fork and submit a pull request.

# License

This project is licensed under the MIT License - see the LICENSE file for details.



