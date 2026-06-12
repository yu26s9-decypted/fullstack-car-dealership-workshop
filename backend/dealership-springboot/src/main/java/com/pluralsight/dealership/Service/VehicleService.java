package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.Dealership;
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
}
