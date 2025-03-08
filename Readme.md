# IFM

## Overview

**IFM** is a gamified programmatic ad platform designed for streamers, enabling monetization through an XP/RP (Experience/Reputation Points) system. IFM integrates with major streaming services (Twitch, YouTube, etc.) to provide real-time analytics, fraud detection, and financial tracking, all built on a microservices architecture.

## Key Components

- **Frontend:** Built with Next.js/React for a responsive, dynamic dashboard.
- **Backend:** Node.js-based microservices for authentication, campaign management, XP/RP tracking, and wallet/payout services.
- **Real-Time Updates:** Implemented using WebSockets or Server-Sent Events (SSE).
- **External Integrations:** OAuth for streaming platforms, payment gateways, and future fraud detection APIs.

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **Docker & Docker Compose**
- **Git**

### Setup Instructions

1. **Clone the Repository:**

   ```bash
    git clone <repository-url>
    cd IFM
    ```

1. **Install Dependencies:**
    - **Frontend:**
        
        ```bash
        cd frontend
        npm install
        ```
        
    - **Backend:**
        
        ```bash
        cd ../backend
        npm install
        ```
        
2. **Configure Environment Variables:**
    - Duplicate the `.env.example` file in both `frontend` and `backend` directories and update with your configuration (API keys, OAuth credentials, DB connection strings, etc.).
3. **Run Locally:**
    - **Backend:**
        
        ```bash
        npm start
        ```
        
    - **Frontend:**
        
        ```bash
        npm run dev
        ```
        
4. **Using Docker:**
    
    From the project root, run:
    
    ```bash
    docker-compose up --build
    ```
    

## Development Workflow

- **Branching:** Use GitFlow for feature branches and maintain a clean `main` branch.
- **Testing:** Run unit tests with Jest/Mocha; use Cypress or Selenium for end-to-end testing.
- **CI/CD:** Automated via GitHub Actions with Docker; check pipeline status for build, test, and deployment.
- **Code Reviews:** Follow strict code review and merge processes to ensure code quality.

## Project Structure

```bash 
IFM/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middlewares/
│   └── package.json
├── shared/
│   └── utils/
├── docker-compose.yml
└── README.md

```

## Contributing

- **Code:** Follow best practices for coding and testing.
- **Documentation:** Update documentation with any feature changes.
- **Reviews:** Submit pull requests and ensure thorough code reviews.

## License

*For internal development use only.*
