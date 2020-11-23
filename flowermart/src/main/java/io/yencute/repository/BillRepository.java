package io.yencute.repository;

import io.yencute.domain.Bill;

import io.yencute.domain.enumeration.OrderStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Bill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query("select bill from Bill bill where bill.user.login = ?#{principal.username}")
    List<Bill> findByUserIsCurrentUser();

    // tương tự: select top 1 bill from bill where status = '...' user.login = '...' orderby placedDate desc
    Bill findFirstByStatusAndUserLoginOrderByPlacedDateDesc(OrderStatus status, String currentUser);
}
