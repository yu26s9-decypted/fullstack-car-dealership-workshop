# Fullstack Car Dealership Workshop

### Languages and Tools

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Hibernate](https://img.shields.io/badge/hibernate-%2359666C.svg?style=for-the-badge&logo=hibernate&logoColor=white)
![Apache Maven](https://img.shields.io/badge/apache_maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

A full-stack car dealership web application built as a hands-on workshop project. The application showcases **Andara**, a fictional luxury EV brand/mock dealership, with a "modern storefront experience" backed by a RESTful API and a cloud-hosted database.

> **Note:** Andara is a fictional EV "company" created solely for the purpose of this workshop. Any resemblance to real brands, vehicles, or campaigns is purely coincidental.

---

## About

This project is to help deepen my hands-on experience with **Angular** on the frontend and **Spring Boot** on the backend, while practicing real-world full-stack patterns such as layered architecture, REST API design, relational data modeling, and connecting an application to a managed cloud database provided by Aiven.

It is also a workshop for my LTCA, walking through how a modern dealership platform comes together end to end: from the database, to the API layer, to a customer-facing frontend.

## Features to be expected...

- **Landing page** — hero section showcasing the Andara S1 with reserve and explore CTAs
- **Vehicle catalog** — browse, filter, and view detailed listings
- **RESTful API** — clean, layered Spring Boot backend (Controller → Service → Repository)
- **Cloud database** — Aiven-managed MySQL with SSL-required connections
- **Relational data layer** — JPA/Hibernate entity mapping
  
## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular, TypeScript, CSS |
| Backend | Java, Spring Boot 4 |
| Database | MySQL 8.4 (hosted on Aiven) |
| ORM | Spring Data JPA / Hibernate |
| Connection Pooling | HikariCP |
| Build Tools | Angular CLI, Maven |

## Project Structure

```
fullstack-car-dealership-workshop/
├── backend/
│   └── dealership-springboot/    # Spring Boot REST API
└── frontend/
    └── car-dealership-web/       # Angular frontend
```

## Getting Started

### Prerequisites

- Java 21+
- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)
- A MySQL database (this project uses a free [Aiven](https://aiven.io) MySQL service, but any MySQL 8+ instance works)

### 1. Clone the repository

```bash
git clone https://github.com/yu26s9-decypted/fullstack-car-dealership-workshop.git
cd fullstack-car-dealership-workshop
```

### 2. Configure the database

The backend connects to a cloud-hosted MySQL instance. Update `backend/dealership-springboot/src/main/resources/application.properties` with your own connection details:

```properties
spring.application.name=dealership
spring.datasource.url=jdbc:mysql://<your-host>:<your-port>/defaultdb?sslMode=REQUIRED
spring.datasource.username=avnadmin
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
```

The database password is read from an environment variable.

```bash
export DB_PASSWORD=your_password
```

### 3. Run the backend

```bash
cd backend/dealership-springboot
./mvnw spring-boot:run
```

The API will start on `http://localhost:8080`.

### 4. Run the frontend

```bash
cd frontend/car-dealership-web
npm install
ng serve
```

The app will be available at `http://localhost:4200`.

## Expected API Endpoint Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vehicles` | List all vehicles |
| `GET` | `/api/vehicles/{id}` | Get a vehicle by ID |
| `POST` | `/api/vehicles` | Add a new vehicle |
| `PUT` | `/api/vehicles/{id}` | Update a vehicle |
| `DELETE` | `/api/vehicles/{id}` | Remove a vehicle |

## Personal Learning Goals

- Strengthen Angular fundamentals: components, services, routing, and HTTP client
- Deepen Spring Boot skills: layered architecture, REST controllers, validation, and JPA

## Author

**Andy Tang** — [@decypted](https://github.com/decypted)

## License

This project is for educational purposes as part of a workshop. Feel free to use it as a learning reference.
