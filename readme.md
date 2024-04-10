# Photo Gallery App

## Description
This is a simple photo gallery app built with React.js for the front end and Node.js with Express.js for the backend. Users can upload photos with titles and descriptions, view existing photos, update photo details, and delete photos.

## Prerequisites
- Node.js and npm installed on your system

## Setup Instructions

### Backend Setup
1. Clone the repository: git clone <repository_url>
2. Navigate to the backend directory: cd server
3. Install dependencies: npm install
4. Create a `.env` file in the backend directory and add the following environment variables:

PORT=4000
MONGODB_URI=<your_mongodb_uri>

Replace `<your_mongodb_uri>` with your MongoDB connection URI.
5. Start the backend server:

npm start


### Frontend Setup
1. Navigate to the frontend directory: cd client
2. Install dependencies: npm install
3. Create a `.env` file in the frontend directory and add the following environment variable: REACT_APP_BACKEND=http://localhost:4000
4. Start the frontend development server


## Usage
- Access the application at `http://localhost:3000` in your web browser.
- Use the app to upload photos, view existing photos, update photo details, and delete photos.

## Technologies Used
- Frontend: React.js, react-hook-form, axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
