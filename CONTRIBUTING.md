# Contributing to the ITIS Enterprise Platform

Thank you for your interest in contributing to the **Integrated Technology Intelligence & Safety (ITIS) Platform**.

---

## 1. Code of Conduct

All contributors are expected to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all team members, partners, and auditors with respect and professionalism.

---

## 2. Getting Started

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Docker & Docker Compose (for local database environment)

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/itis-org/itis-enterprise-platform.git
cd itis-enterprise-platform

# Install dependencies
npm install

# Setup local environment variables
cp .env.example .env

# Run database migrations and seed
npm run seed

# Start development server
npm run dev
```

---

## 3. Git Workflow & Conventional Commits

We strictly follow the **Conventional Commits** specification (`type(scope): description`):

- `feat`: A new feature (e.g., `feat(c3): add real-time bus telemetry websocket filter`)
- `fix`: A bug fix (e.g., `fix(auth): handle JWT token expiration on refresh`)
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, no code change
- `refactor`: Refactoring production code
- `test`: Adding or updating tests
- `chore`: Build or tooling updates

---

## 4. Pull Request Checklist

Before submitting a Pull Request (PR):
1. Run `npm run lint` and ensure 0 errors or warnings.
2. Run `npm run build` and ensure all frontend and server packages build cleanly.
3. Ensure no secrets, API keys, or personal identifiable information (PII) are committed.
4. Update `CHANGELOG.md` if submitting functional changes.
