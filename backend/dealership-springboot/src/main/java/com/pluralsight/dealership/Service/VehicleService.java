package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Model.Vehicle;
import com.pluralsight.dealership.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles(){
        return vehicleRepository.findAll();
    }
}
