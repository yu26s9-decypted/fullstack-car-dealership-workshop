package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.Vehicle;
import com.pluralsight.dealership.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles(){
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id){
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> getVehicleByMake(String make){
        return vehicleRepository.findByMake(make);
    }

    public List<Vehicle> getVehicleByModel(String model){
        return vehicleRepository.findByModel(model);
    }

    public Optional<Vehicle> getVehicleByVin(String vin){
        return vehicleRepository.findByVin(vin);
    }

    public List<Vehicle> getVehiclesByColor(String color){
        return vehicleRepository.findByColor(color);
    }

    public List<Vehicle> getVehiclesByYearBetween(int minYear, int maxYear){
        return vehicleRepository.findByYearBetween(minYear, maxYear);
    }

    public List<Vehicle> getVehiclesByPriceRange(BigDecimal minPrice, BigDecimal maxPrice){
        return vehicleRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public List<Vehicle> getVehiclesByMinPrice(BigDecimal minPrice) {
        return vehicleRepository.findByPriceGreaterThanEqual(minPrice);
    }

    public List<Vehicle> getVehiclesByMaxPrice(BigDecimal maxPrice) {
        return vehicleRepository.findByPriceLessThanEqual(maxPrice);
    }

    public List<Vehicle> getVehiclesByMaxRange(int maxRange) {
        return vehicleRepository.findByOdometerLessThanEqual(maxRange);
    }

    public List<Vehicle> getVehiclesByMinRange(int minRange) {
        return vehicleRepository.findByOdometerGreaterThanEqual(minRange);
    }

    public List<Vehicle> getVehiclesByOdometerRange(int min, int max) {
        return vehicleRepository.findByOdometerBetween(min, max);
    }


    public Optional<Vehicle> updateVehicle(Long id, Vehicle updatedState){
        return vehicleRepository.findById(id).map(
                vehicle -> {
                    vehicle.setMake(updatedState.getMake());
                    vehicle.setModel(updatedState.getModel());
                    vehicle.setYear(updatedState.getYear());
                    vehicle.setColor(updatedState.getColor());
                    vehicle.setPrice(updatedState.getPrice());
                    vehicle.setOdometer(updatedState.getOdometer());
                    vehicle.setVehicleType(updatedState.getVehicleType());
                    vehicle.setDescription(updatedState.getDescription());
                    vehicle.setImageURL(updatedState.getImageURL());
                    vehicle.setBannerUrl(updatedState.getBannerUrl());

                    return vehicleRepository.save(vehicle);
                }
        );
    }


}
