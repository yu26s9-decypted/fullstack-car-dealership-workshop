package com.pluralsight.dealership.Model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "vehicle_specs")
public class VehiclesSpec {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private Integer rangeMiles;
        private Integer topSpeedMph;
        private BigDecimal zeroToSixty;
        private Integer horsepower;
        private Integer torque;

        @OneToOne
        @JoinColumn(name = "vehicle_id")
        private Vehicle vehicle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRangeMiles() {
        return rangeMiles;
    }

    public void setRangeMiles(Integer rangeMiles) {
        this.rangeMiles = rangeMiles;
    }

    public Integer getTopSpeedMph() {
        return topSpeedMph;
    }

    public void setTopSpeedMph(Integer topSpeedMph) {
        this.topSpeedMph = topSpeedMph;
    }

    public BigDecimal getZeroToSixty() {
        return zeroToSixty;
    }

    public void setZeroToSixty(BigDecimal zeroToSixty) {
        this.zeroToSixty = zeroToSixty;
    }

    public Integer getHorsepower() {
        return horsepower;
    }

    public void setHorsepower(Integer horsepower) {
        this.horsepower = horsepower;
    }

    public Integer getTorque() {
        return torque;
    }

    public void setTorque(Integer torque) {
        this.torque = torque;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
