# API_Profile_Playground

This project is a basic playground that stores candidate profile information in a MongoDB database and exposes it via a small API with a minimal frontend for querying.

## Architecture

The application is divided into two main parts:

- **Backend (Node.js/Express.js/MongoDB)**: Provides RESTful API endpoints for managing and querying profile data.
- **Frontend (Plain HTML/CSS/JavaScript)**: A simple web interface to display and search the profile information.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud-hosted)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory with your MongoDB URI:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
    Replace `your_mongodb_connection_string` with your actual MongoDB connection string (e.g., `mongodb://localhost:27017/meapi` or a MongoDB Atlas URI).
4.  Seed the database with sample data (optional, but recommended for initial setup):
    ```bash
    npm run seed
    ```
    To clear the seeded data, you can run:
    ```bash
    npm run destroy
    ```
5.  Start the backend server:
    ```bash
    npm start
    ```
    The backend API will be running on `http://localhost:3000` (or your specified PORT).

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Open `index.html` in your web browser. This can be done by simply double-clicking the file or by using a live server extension in your code editor.
    The frontend will automatically fetch data from the backend API.

## Database Schema

The MongoDB database uses a single collection named `profiles`. The schema is defined using Mongoose in `backend/models/Profile.js`.

```javascript
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: { type: String },
  skills: [{ type: String }],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      links: [
        {
          github: { type: String },
          linkedin: { type: String },
          portfolio: { type: String },
        },
      ],
    },
  ],
  work: [
    {
      company: { type: String, required: true },
      title: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  links: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
});
```

## Sample API Calls (using curl)

Assuming your backend is running on `http://localhost:3000`.

### Get Profile

```bash
curl http://localhost:3000/api/profile
```

### Create/Update Profile (using Postman or curl)

This endpoint allows you to create a new profile or update an existing one. If a profile with the given `email` already exists, it will be updated; otherwise, a new one will be created.

**Endpoint:** `POST http://localhost:3000/api/profile`

**Headers:**
`Content-Type: application/json`

**Body (raw JSON):**

```json
{
  "name": "",
  "email": "",
  "education": "",
  "skills": [],
  "projects": [
    {
      "title": "",
      "description": "",
      "links": [
        {
          "github": ""
        }
      ]
    }
  ],
  "work": [
    {
      "company": "",
      "title": "",
      "startDate": "YYYY-MM-DDTHH:mm:ss.sssZ",
      "description": ""
    }
  ],
  "links": {
    "github": "",
    "linkedin": "",
    "portfolio": ""
  }
}
```

**Note:**

- Ensure the `email` is unique if creating a new profile.
- `skills` can be either a comma-separated string (e.g., `"Python, JavaScript"`) or an array of strings (e.g., `["Python", "JavaScript"]`). The backend will handle both.
- `startDate` and `endDate` for `work` should be in ISO 8601 format (e.g., `"2023-01-15T00:00:00.000Z"` or `"2023-01-15"`).

### Get Projects by Skill (e.g., Python)

```bash
curl http://localhost:3000/api/profile/projects?skill=python
```

### Get Top Skills

```bash
curl http://localhost:3000/api/profile/skills/top
```

### Search Profile (e.g., for "Machine Learning")

```bash
curl http://localhost:3000/api/profile/search?q=machine%20learning
```

## Known Limitations

- **Authentication/Authorization**: The API currently has no authentication or authorization mechanisms. Anyone can create, read, and update the profile.
- **Error Handling**: Basic error handling is in place, but could be more robust.
- **Frontend Interactivity**: The frontend is minimal and primarily for display. Advanced interactive features (e.g., editing profile directly from the frontend) are not implemented.
- **Data Validation**: While Mongoose provides schema validation, more extensive input validation for API requests could be added.

## 💼 Resume
📌 **[Download / View Resume](https://drive.google.com/file/d/1kBrjcFhcwWc93MVno_wATioECDcOGiq5/view?usp=sharing)**  
_A concise overview of my skills, projects, and experience_