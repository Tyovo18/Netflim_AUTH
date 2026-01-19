# Netflim_AUTH - AI Coding Agent Instructions

## Project Overview
**Netflim_AUTH** is a Node.js authentication microservice for the Netflim streaming platform. It's in early development with an established directory structure but minimal implementation.

**Tech Stack:**
- **Runtime:** Node.js (CommonJS)
- **Architecture:** Layered MVC with repositories pattern
- **Status:** Scaffold-stage (all directories empty except config planning)

---

## Architecture & Structure

### Layered Architecture Pattern
The codebase follows a **4-tier architecture**:

```
routes/ → controllers/ → services/ → repositories/ → models/
```

- **routes/**: Express route handlers, path definitions only
- **controllers/**: HTTP request/response handlers, input validation delegation
- **services/**: Business logic, authentication algorithms, cross-service coordination
- **repositories/**: Data access abstraction, database query isolation
- **models/**: Data schemas (likely Mongoose/Sequelize definitions)

### Supporting Directories

| Directory | Purpose |
|-----------|---------|
| `config/` | Environment setup, database connections, constants |
| `middlewares/` | Auth middleware, error handling, request logging |
| `validators/` | Schema validation (likely input/output schemas) |
| `utils/` | Shared helpers (JWT generation, password hashing, etc.) |

### Why This Structure?
- **Loose coupling:** Changes to DB don't affect HTTP layer
- **Testability:** Each layer can be mocked independently
- **Scalability:** Easy to migrate repositories to microservices later

---

## Development Workflows

### Setup
1. Install dependencies: `npm install`
2. Create `.env` (currently empty) with DB credentials, JWT secrets
3. Start: `node src/app.js` (entry point exists but is empty)

### Testing
**Currently no test framework configured.** When adding tests:
- Use Jest or Mocha
- Implement in `test/` directory (create if needed)
- Mock repository layer; don't use live DB in tests

### Code Organization Rules
- **One responsibility per file:** Each controller/service handles one domain (users, tokens, etc.)
- **No cross-layer leakage:** Controllers never access DB directly, only via services
- **Error handling centralized:** Use middleware for HTTP error responses

---

## Key Patterns & Conventions

### Async/Await Standard
Use async/await for all async operations:
```javascript
// ✅ Good
async handleLogin(req, res) {
  try {
    const user = await this.userService.authenticate(req.body);
    res.json({ token: user.token });
  } catch (error) {
    next(error); // Pass to middleware
  }
}

// ❌ Avoid callbacks/promise chains
```

### Environment Configuration
- All secrets in `.env` (loaded via `dotenv`)
- Reference via `process.env.DB_URL`, `process.env.JWT_SECRET`
- Never hardcode credentials

### Dependency Injection
When implemented, pass dependencies to constructors:
```javascript
class UserService {
  constructor(userRepository, tokenUtils) {
    this.userRepository = userRepository;
    this.tokenUtils = tokenUtils;
  }
}
```

---

## Common Tasks & Examples

### Adding a New Feature (e.g., user registration)
1. **Route** (`routes/auth.js`): Define `POST /register`
2. **Controller** (`controllers/authController.js`): Parse request, call service
3. **Service** (`services/authService.js`): Hash password, validate email, call repo
4. **Repository** (`repositories/userRepository.js`): Insert into DB
5. **Validator** (`validators/authValidator.js`): Schema for request body

### Adding Middleware (e.g., JWT verification)
- Create `middlewares/auth.js`
- Use in route: `router.post('/protected', verifyToken, controller)`
- Attach user to `req.user` for downstream handlers

### Database Integration (when specified)
- Define schemas in `models/` (e.g., `User.js`)
- Create repository methods: `findById()`, `create()`, `update()`
- Initialize connection in `config/database.js`

---

## Integration Points & Dependencies

### Expected External Services
- **Database:** (TBD - configure in `.env`)
- **Email Service:** (for verification, if needed)
- **External Auth:** (OAuth2, if planned)

### Known Constraints
- CommonJS only (no ES modules)
- No async test framework configured
- No error logging system yet

---

## Quick Reference

| Task | Location |
|------|----------|
| Add authentication logic | `services/authService.js` |
| Define user schema | `models/User.js` |
| Handle DB queries | `repositories/userRepository.js` |
| Add validation rules | `validators/` |
| Error handling | `middlewares/errorHandler.js` |
| Start app | `src/app.js` (empty, needs Express init) |

---

## For AI Agents: Critical Notes
- **Before coding:** Read existing middleware/error patterns first (likely in Express boilerplate docs)
- **When adding routes:** Ensure corresponding service and repository exist
- **Testing:** Create tests in parallel with implementation; don't leave untested
- **Database:** Assume schema-agnostic structure; design repositories to work with any DB driver
