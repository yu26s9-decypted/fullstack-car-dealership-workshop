package com.pluralsight.dealership.Service;

import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Repository.DealershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DealershipService {
    private final DealershipRepository dealershipRepository;

    public DealershipService(DealershipRepository dealershipRepository) {
        this.dealershipRepository = dealershipRepository;
    }

    public List<Dealership> getAllDealerships(){
        return dealershipRepository.findAll();
    }

    public Optional<Dealership> getDealershipByName(String name){
        return dealershipRepository.findByName(name);
    }

    public Optional<Dealership> getDealershipByAddress(String address){
        return dealershipRepository.findByAddress(address);
    }


}
