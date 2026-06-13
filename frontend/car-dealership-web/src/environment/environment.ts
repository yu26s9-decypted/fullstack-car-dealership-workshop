const production = true;

export const environment = {
    production,
    baseURL: production ? 'https://fullstack-car-dealership-workshop.onrender.com/api/v1' : 'http://localhost:8080/api/v1'
  
}