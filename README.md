# Contact Manager (MERN)

A full-stack contact management application built with the MERN stack, featuring MongoDB persistence, dark/light mode, and real-time CRUD operations.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)

## Live Demo

[contact-manager-mern-cg19.onrender.com](https://contact-manager-mern-cg19.onrender.com/)

## Overview

A MERN (MongoDB, Express.js, React, Node.js) contact management application that provides full CRUD operations for contacts with a MongoDB backend. Features dark/light mode with localStorage persistence and zero-refresh navigation using React Router.

## Features

- **Add Contacts** -- Create new contacts with name and email
- **Edit Contacts** -- Update existing contact information
- **Delete Contacts** -- Remove contacts from the database
- **Search** -- Filter contacts by name or email
- **Contact Details** -- View individual contact information
- **Dark/Light Mode** -- Theme toggle persisted in localStorage
- **MongoDB Persistence** -- All data stored in MongoDB
- **Zero-Refresh Navigation** -- SPA routing with React Router

## Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Frontend  | React 19, React Router 7, CSS |
| Backend   | Node.js, Express 5            |
| Database  | MongoDB, Mongoose 8           |
| Dev Tools | Concurrently, Nodemon         |

## Project Structure

```
Contact-Manager-Mern/
├── client/                     # React frontend
│   ├── public/
│   └── src/
│       └── components/
│           ├── App.js          # Root with routing and state
│           ├── AddContact.js   # Add contact form
│           ├── EditContact.js  # Edit contact form
│           ├── ContactList.js  # Contact list display
│           ├── ContactCard.js  # Individual contact card
│           ├── ContactDetail.js # Contact detail view
│           ├── Header.js       # App header
│           └── darkmode.js     # Theme toggle
├── config/
│   ├── db.js                   # MongoDB connection
│   └── default.json            # Database URL config
├── models/
│   └── Contact.js              # Contact Mongoose schema
├── routes/
│   └── api/
│       └── contacts.js         # CRUD API routes
├── index.js                    # Express server entry
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/Sagargupta16/Contact-Manager-Mern.git
cd Contact-Manager-Mern

# Install all dependencies (backend + frontend)
npm install && cd client && npm install && cd ..
```

### Configuration

Update `config/default.json` with your MongoDB connection string:

```json
{
  "mongoURI": "your_mongodb_connection_string"
}
```

### Running

```bash
npm run dev
# Frontend: http://localhost:3000
# Backend:  http://localhost:3006
```

## API Endpoints

| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | `/api/contacts`             | Get all contacts   |
| GET    | `/api/contacts/contact/:id` | Get single contact |
| POST   | `/api/contacts`             | Create contact     |
| PUT    | `/api/contacts/:id`         | Update contact     |
| DELETE | `/api/contacts/:id`         | Delete contact     |

## Screenshots

![Contact Manager](./client/images/1_1.png)
![Contact Manager](./client/images/1_2.png)
![Contact Manager](./client/images/1_3.png)

## License

MIT
