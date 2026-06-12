package com.pluralsight.dealership.Repository;

import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
