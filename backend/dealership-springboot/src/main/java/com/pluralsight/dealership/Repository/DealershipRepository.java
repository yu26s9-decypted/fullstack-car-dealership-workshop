package com.pluralsight.dealership.Repository;

import com.pluralsight.dealership.Model.Dealership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DealershipRepository extends JpaRepository<Dealership, Long> {
    List<Dealership> findByAddress(String address);
    Optional<Dealership> findByName(String name);
    Optional<Dealership> findByPhone(String phone);
}
