package com.pluralsight.dealership;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfig(){
        return new WebMvcConfigurer() {
            public void addCorsMappings(@NonNull CorsRegistry registry){


                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:4200",
                                "https://fullstack-car-dealership-workshop.vercel.app",
                                "https://andara.andytang.tech"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
