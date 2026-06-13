# Fullstack Car Dealership Workshop

<img width="1916" height="945" alt="Screenshot 2026-06-12 at 6 57 15 PM" src="https://github.com/user-attachments/assets/50a2663e-dc6d-4e23-abe5-4dea1c3da853" />

### Languages and Tools

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Hibernate](https://img.shields.io/badge/hibernate-%2359666C.svg?style=for-the-badge&logo=hibernate&logoColor=white)
![Apache Maven](https://img.shields.io/badge/apache_maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

A full-stack car dealership web application built as a hands-on workshop project. The application showcases **Andara**, a fictional luxury EV brand and mock dealership, with a modern storefront experience backed by a RESTful API and a cloud-hosted database.

> **Note:** Andara is a fictional EV "company" created solely for the purpose of this workshop. Any resemblance to real brands, vehicles, or campaigns is purely coincidental.

---

## About

This project deepens hands-on experience with **Angular** on the frontend and **Spring Boot** on the backend, while practicing real-world full-stack patterns: layered architecture, REST API design, relational data modeling, and connecting an application to a managed cloud database provided by Aiven.

It is also a workshop for my LTCA, walking through how a modern dealership platform comes together end to end: from the database, to the API layer, to a customer-facing frontend.

## Features

- **Landing page:** hero section showcasing the Andara brand
- **Vehicle catalog:** browse and view detailed listings for each model (currently api only)
- **RESTful API:** clean, layered Spring Boot backend (Controller, Service, Repository)
- **Cloud database:** Aiven-managed MySQL with SSL-required connections
- **Cloud image hosting:** vehicle and banner images served via Cloudinary CDN
- **Relational data layer:** JPA/Hibernate
- **Deployment:** frontend on Vercel, backend on Render

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, TypeScript, CSS |
| Backend | Java, Spring Boot |
| Database | MySQL 8.4 (hosted on Aiven) |
| ORM | Spring Data JPA / Hibernate |
| Image Hosting | Cloudinary |
| Connection Pooling | HikariCP |
| Build Tools | Angular CLI, Maven |
| Deployment | Vercel (frontend), Render (backend) |

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

The database password is read from an environment variable:

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

## API Endpoint Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/vehicle` | List all vehicles |
| `GET` | `/api/v1/vehicle?model={model}` | Get vehicles by model |
| `GET` | `/api/v1/dealership` | List all dealerships |
| `GET` | `/api/v1/vehicle/{id}` | Get vehicle by id |
| `PUT` | `/api/v1/vehicle/{id}` | Update vehicle by id |


## Personal Learning Goals

- Strengthen Angular fundamentals: components, services, routing, and HTTP client
- Deepen Spring Boot skills: layered architecture, REST controllers, validation, and JPA
- Practice full-stack deployment: environment variables, CORS configuration, and cloud hosting

## Author

**Andy Tang** — [@decypted](https://github.com/decypted)

## License

This project is for educational purposes as part of a workshop. Feel free to use it as a learning reference.
