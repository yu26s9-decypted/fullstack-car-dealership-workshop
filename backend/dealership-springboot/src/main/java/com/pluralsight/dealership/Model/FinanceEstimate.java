package com.pluralsight.dealership.Model;

import java.math.BigDecimal;

public class FinanceEstimate {
    private Long vehicleId;
    private String paymentType;
    private BigDecimal downPayment;
    private Integer termMonths;
    private BigDecimal monthlyPayment;
    private BigDecimal totalPayment;

    public FinanceEstimate() {}

    public BigDecimal totalPayment() {
        return totalPayment;
    }

    public void setTotalPrice(BigDecimal totalPayment) {
        this.totalPayment = totalPayment;
    }

    public BigDecimal getMonthlyPayment() {
        return monthlyPayment;
    }

    public void setMonthlyPayment(BigDecimal monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
    }

    public Integer getTermMonths() {
        return termMonths;
    }

    public void setTermMonths(Integer termMonths) {
        this.termMonths = termMonths;
    }

    public BigDecimal getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(BigDecimal downPayment) {
        this.downPayment = downPayment;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }
}
