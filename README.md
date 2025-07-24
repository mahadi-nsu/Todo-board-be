# TODO app backend

## How to Run This Project

1. Create a `.env` file in the project root. (copy `.env.example` file content and paste to .env)
2. Start the database:
   ```bash
   docker compose up
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run database migrations:
   ```bash
   npm run db:migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

- The server will be available at: [http://localhost:5001/](http://localhost:5001/)
- Swagger API docs: [http://localhost:5001/swagger](http://localhost:5001/swagger)

---

## Technologies Used

- **NestJS** (Node.js framework)
- **TypeScript**
- **PostgreSQL** (via Docker)
- **Drizzle ORM**
- **Zod** (validation)
- **Swagger** (OpenAPI docs)
- **Passport & JWT** (authentication)
- **Pino** (logging)
- **Docker** (for database)
- **ESLint, Husky** (linting & git hooks)
- **Jest** (testing)

---

## API Endpoints

### Authentication

- `POST /authentication/` — Login (returns JWT)

### Users

- `POST /users/registration` — Register a new user
- `GET /users/me` — Get current user (JWT required)

### Categories (JWT required)

- `POST /categories` — Create category
- `GET /categories` — List all categories
- `PATCH /categories/:id` — Update category
- `PATCH /categories/:id/swap-order/:categoryId2` — Swap order of two categories
- `DELETE /categories/:id` — Delete category (optionally move tickets)

### Labels (JWT required)

- `POST /labels` — Create label
- `GET /labels` — List all labels
- `PATCH /labels/:id` — Update label
- `DELETE /labels/:id` — Delete label

### Tickets (JWT required)

- `POST /tickets` — Create ticket
- `GET /tickets` — List all tickets
- `GET /tickets/get/:id` — Get ticket by ID
- `GET /tickets/history` — Get all ticket-category history
- `POST /tickets/:id/labels` — Add label to ticket
- `PATCH /tickets/:id` — Update ticket
- `DELETE /tickets/:id` — Delete ticket

### Root

- `GET /` — Health check (returns "Hello World!")

---

## Notes

- All endpoints (except authentication and registration) require a valid JWT in the `Authorization` header.
- For full API details and request/response schemas, see Swagger docs at `/swagger` after running the server.
