package com.pluralsight.dealership.Controller;


import com.pluralsight.dealership.Model.Vehicle;
import com.pluralsight.dealership.Service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "https://fullstack-car-dealership-workshop.vercel.app"})
@RequestMapping("/api/v1/vehicle")
public class VehicleController {
    private final VehicleService vehicleService;
    
    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }
    
    @GetMapping
    public List<Vehicle> getVehicle(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxYear,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer odometerMinRange,
            @RequestParam(required = false) Integer odometerMaxRange

    ) {
       if(make != null){
           return vehicleService.getVehicleByMake(make);
       }
       if(model != null) {
           return vehicleService.getVehicleByModel(model);
       }
       if(color != null) {
           return vehicleService.getVehiclesByColor(color);
       }
       if(minYear != null && maxYear != null) {
           return vehicleService.getVehiclesByYearBetween(minYear, maxYear);
       }
       if(minPrice != null && maxPrice != null) {
           return vehicleService.getVehiclesByPriceRange(minPrice, maxPrice);
       }
       if(maxPrice != null){
           return vehicleService.getVehiclesByMaxPrice(maxPrice);
       }
       if(minPrice != null){
           return vehicleService.getVehiclesByMinPrice(minPrice);
       }
        if (odometerMinRange != null && odometerMaxRange != null) {
            return vehicleService.getVehiclesByOdometerRange(odometerMinRange, odometerMaxRange);
        }
       if(odometerMinRange != null) {
           return vehicleService.getVehiclesByMinRange(odometerMinRange);
       }
       if(odometerMaxRange != null){
           return vehicleService.getVehiclesByMaxRange(odometerMaxRange);
       }


        return vehicleService.getAllVehicles();
    }


    
}
