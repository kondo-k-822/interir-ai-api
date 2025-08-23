# PostgreSQL Docker Compose Project

This project sets up a PostgreSQL environment using Docker Compose. It includes the necessary configuration files to run a PostgreSQL container with data persistence and initialization scripts.

## Project Structure

```
postgres-docker-compose
├── docker-compose.yml
├── init-scripts
│   └── init.sql
└── README.md
```

## Getting Started

To set up and run the PostgreSQL environment, follow these steps:

1. **Clone the repository** (if applicable):
   ```
   git clone <repository-url>
   cd postgres-docker-compose
   ```

2. **Build and start the containers**:
   ```
   docker-compose up -d
   ```

3. **Access the PostgreSQL database**:
   You can connect to the PostgreSQL database using a PostgreSQL client or through the command line. The default connection parameters are:
   - Host: `localhost`
   - Port: `15432`
   - User: `postgres`
   - Password: `your_password` (replace with the password set in the `docker-compose.yml`)

4. **Initialize the database**:
   The SQL commands in `init-scripts/init.sql` will be executed automatically when the PostgreSQL container starts for the first time. You can modify this file to set up your database schema and initial data.

## Stopping the Containers

To stop the running containers, use the following command:
```
docker-compose down
```

## Additional Information

For more details on Docker Compose and PostgreSQL, refer to the official documentation:
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)