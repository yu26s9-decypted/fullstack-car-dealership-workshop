package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.FinanceEstimate;
import com.pluralsight.dealership.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
public class OrderService {
    private final VehicleRepository vehicleRepository;

    public OrderService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Optional<FinanceEstimate> calcEstimate(FinanceEstimate req){
        return vehicleRepository.findById(req.getVehicleId()).map(vehicle -> {
            BigDecimal price = vehicle.getPrice();
            BigDecimal downPayment = req.getDownPayment() != null ? req.getDownPayment() : BigDecimal.ZERO;
            int termContractLength = req.getTermMonths() != null ? req.getTermMonths() : 84;
            String contractType = req.getPaymentType() != null ? req.getPaymentType() : "finance";

            BigDecimal amount = price.subtract(downPayment);
            BigDecimal monthly;

            if (contractType.equals("finance")) {
                monthly = amount.divide(BigDecimal.valueOf(termContractLength), 2, RoundingMode.HALF_UP);
            } else {
                monthly = BigDecimal.ZERO;
            }

            req.setMonthlyPayment(monthly);
            req.setTotalPrice(price);
            return req;
        });
    }
}
