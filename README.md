# Threads Clone

A Threads Clone project that replicates the functionality and features of the Threads app by META. Threads is a popular application that enables users to engage in dynamic conversations and share multimedia content seamlessly. This clone aims to mimic the core functionalities of Threads, offering a similar user experience.

## Technologies Used

### Backend

-   **Node.js**: The backend is powered by Node.js, providing a robust server-side environment.
-   **Express**: Utilized for building the server and handling HTTP requests and routes efficiently.
-   **MongoDB**: A NoSQL database used for storing application data in a flexible and scalable manner.
-   **Socket.io**: Integrated to enable real-time, bidirectional communication between the server and clients for dynamic updates.
-   **Cloudinary**: Employed for seamless image upload functionality within the application.

### Frontend

-   **React**: The frontend is developed using React, a popular JavaScript library for building dynamic user interfaces.
-   **TypeScript**: Enhances code maintainability and provides a more robust type system for a safer development experience.
-   **Redux**: Implemented for state management, ensuring a predictable and efficient way to handle application state.
-   **Tailwind CSS**: Used to style the application, providing a utility-first CSS framework for a modern and responsive design.

# Features

-   **Real-time Messaging**: Enable real-time chat functionality using Socket.io to facilitate instantaneous communication between users.
-   **Media Uploads**: Allow users to upload and share images using Cloudinary for a seamless media sharing experience.
-   **User Authentication**: Implement secure user authentication to ensure privacy and a personalized user experience.

# Getting Started

Follow these steps to set up and run the Threads Clone project on your local machine.

### Prerequisites

Ensure you have the following software installed on your machine:

-   **Node.js**: Make sure you have Node.js installed. If not, download and install the latest version from the official website.

-   **MongoDB**: Install MongoDB Community Edition to set up the database.

### Installation

1. Clone the repository:<br/>
   `git clone https://github.com/your-username/threads-clone.git`<br/>
   `cd threads-clone`

2. Install dependencies:
   Navigate to the backend and frontend directories separately and install the dependencies:

    #### Backend

    `cd api`  
     `npm install`<br/>

    #### Frontend

    `cd client`  
     `npm install`

### Configuration

1. Backend Configuration:
   Create a .env file in the api directory and set the following environment variables from .env.example file

### Run the Application

1. Start the backend server:
   From the backend directory, run:
   `npm run dev`
   The server will start running at http://localhost:5000.

2. Start the frontend application:
   From the client directory, run:
   `npm run dev`
   The client application will start running at http://localhost:5173.

3. Access the application:
   Open your web browser and go to http://localhost:5173 to access the Threads Clone application.

# Contributing

Contributions and suggestions are welcome! If you want to contribute to this project, please follow the contribution guidelines.

# License

This project is licensed under the MIT License.
