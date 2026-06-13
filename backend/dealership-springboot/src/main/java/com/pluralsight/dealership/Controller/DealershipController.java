package com.pluralsight.dealership.Controller;

import com.pluralsight.dealership.Model.Dealership;
import com.pluralsight.dealership.Service.DealershipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dealership")
@CrossOrigin(origins = "http://localhost:4200")
public class DealershipController {
    private final DealershipService dealershipService;

    public DealershipController(DealershipService dealershipService) {
        this.dealershipService = dealershipService;
    }

    @GetMapping
    public ResponseEntity<?> getDealerships(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String address
    ){
        if(name != null){
            return dealershipService.getDealershipByName(name)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }
        if(address !=null){
            return dealershipService.getDealershipByAddress(address)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        return ResponseEntity.ok(dealershipService.getAllDealerships());
    }
}
