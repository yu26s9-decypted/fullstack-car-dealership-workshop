package com.pluralsight.dealership.Controller;


import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Model.Vehicle;
import com.pluralsight.dealership.Service.VehicleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vehicle")
public class VehicleController {
    private final VehicleService vehicleService;
    
    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }
    
    @GetMapping
    public List<Vehicle> getAllVehicle() {
        return vehicleService.getAllVehicles();
    }
    
}
