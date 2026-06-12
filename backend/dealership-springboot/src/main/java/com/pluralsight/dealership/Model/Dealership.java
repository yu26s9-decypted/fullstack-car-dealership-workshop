package com.pluralsight.dealership.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dealerships")
public class Dealership {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String name;
    private String address;
    private String phone;


    // cascade = ALL: saves/updates/deletes on this dealership cascade to its vehicles
    @OneToMany(mappedBy = "dealership", cascade = CascadeType.ALL)
    private List<Vehicle> inventory = new ArrayList<>();

    public Dealership() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Vehicle> getInventory() {
        return inventory;
    }

    public void setInventory(List<Vehicle> inventory) {
        this.inventory = inventory;
    }
}
