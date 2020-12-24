package io.yencute.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.yencute.domain.Bill;
import io.yencute.domain.BillItem;
import io.yencute.domain.User;
import io.yencute.domain.enumeration.OrderStatus;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class BillDTO {
    private Long id;

    @NotNull
    @Column(name = "placed_date", nullable = false)
    private Instant placedDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatus status;

    @ManyToOne
    @JsonIgnoreProperties(value = "bills", allowSetters = true)
    private User user;

    private List<BillItem> billItems;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPlacedDate() {
        return placedDate;
    }

    public BillDTO placedDate(Instant placedDate) {
        this.placedDate = placedDate;
        return this;
    }

    public void setPlacedDate(Instant placedDate) {
        this.placedDate = placedDate;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public BillDTO status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public BillDTO user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<BillItem> getBillItems(){
        return this.billItems;
    }

    public void setBillItems(List<BillItem> billItems){
        this.billItems = billItems;
    }

    public BillDTO billItems(List<BillItem> billItems){
        this.billItems = billItems;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BillDTO)) {
            return false;
        }
        return id != null && id.equals(((BillDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", placedDate='" + getPlacedDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", billItems='" + getBillItems().toString() + "'" +
            "}";
    }

}
