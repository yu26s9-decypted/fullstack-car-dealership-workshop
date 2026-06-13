package com.pluralsight.dealership.Repository;

import com.pluralsight.dealership.Model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByColor(String color);
    List<Vehicle> findByMake(String make);
    List<Vehicle> findByModel(String model);
    Optional<Vehicle> findByVin(String vin);
    List<Vehicle> findByYearBetween(int minYear, int maxYear);
    List<Vehicle> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Vehicle> findByPriceGreaterThanEqual(BigDecimal minPrice);
    List<Vehicle> findByPriceLessThanEqual(BigDecimal maxPrice);
    List<Vehicle> findByOdometerGreaterThanEqual(int minRange);
    List<Vehicle> findByOdometerLessThanEqual(int maxRange);
    List<Vehicle> findByOdometerBetween(int minOdometer, int maxOdometer);

}
