## ⚙️ Scripts

| Command | Description |
|----------|-------------|
| `yarn dev` | Run the server in development mode |
| `yarn build` | Compile TypeScript into JavaScript |
| `yarn start` | Start the server after building |
| `yarn lint` | Check code style and formatting |
| `yarn test` | Run all tests using Jest |

---

## 🌱 Environment Variables (`.env`)

```bash
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key


project-root/
│
├── src/
│   ├── app.ts                # Express app initialization
│   ├── server.ts             # Entry point (start server)
│   │
│   ├── config/               # System configuration
│   │   ├── env.ts            # Load environment variables
│   │   ├── database.ts       # Database connection
│   │   ├── redis.ts          # Redis connection
│   │   └── logger.ts         # Winston/Pino logger
│   │
│   ├── modules/              # Independent feature modules
│   │   ├── user/
│   │   │   ├── user.model.ts
│   │   │   ├── user.repository.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.routes.ts
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.routes.ts
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   ├── auth.middleware.ts
│   │   └── request-logger.middleware.ts
│   │
│   ├── utils/
│   │   ├── api-response.ts
│   │   ├── async-handler.ts
│   │   └── date.helper.ts
│   │
│   ├── jobs/                 # Cron jobs or background workers
│   │   └── sync-job.ts
│   │
│   ├── interfaces/           # Shared interfaces
│   │   ├── request.interface.ts
│   │   ├── response.interface.ts
│   │   └── service.interface.ts
│   │
│   └── tests/                # Jest tests
│       ├── unit/
│       └── integration/
│
├── prisma/                   # If using Prisma
│   └── schema.prisma
│
├── ormconfig.ts              # If using TypeORM
│
├── .env
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── yarn.lock
└── package.json


| Module                        | Detail                        |
| ----------------------------- | ---------------------------------------------- |
| **Auth & User Management**    | JWT, Refresh token, OAuth2, bcrypt             |
| **Task & Project Management** | CRUD advance, pagination, search, soft delete |
| **Automation Rule Engine**    | EventEmitter + BullMQ + CronJob                |
| **Analytics & Reporting**     | Aggregation query, caching, streaming data     |
| **Notifications**             | WebSocket + Email queue                        |
| **Audit Log**                 | PostgreSQL JSONB, history tracking             |
| **File Upload**               | Stream, S3 SDK, presigned URL                  |
| **Testing**                   | Jest + Supertest + Mocking                     |
| **Monitoring & Logging**      | Winston + Morgan + OpenTelemetry               |


# System Design 

Backend: Express

Database: PostgreSQL (TypeORM)

Cache: Redis

Queue: BullMQ (Redis)

Auth: JWT + Refresh Token + OAuth2 (Google)

Storage: S3 or MinIO

Infra: Docker + Terraform + AWS EC2/RDS/S3