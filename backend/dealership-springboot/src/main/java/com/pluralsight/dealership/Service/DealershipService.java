package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Repository.DealershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealershipService {
    private final DealershipRepository dealershipRepository;

    public DealershipService(DealershipRepository dealershipRepository) {
        this.dealershipRepository = dealershipRepository;
    }

    public List<Dealership> getAllDealerships(){
        return dealershipRepository.findAll();
    }
}
