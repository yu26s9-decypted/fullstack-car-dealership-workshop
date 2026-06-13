package com.pluralsight.dealership.Controller;

import com.pluralsight.dealership.Model.FinanceEstimate;
import com.pluralsight.dealership.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/estimate")
    public ResponseEntity<FinanceEstimate> getOrderEstimate(@RequestBody FinanceEstimate req){
        return orderService.calcEstimate(req)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
