package io.yencute.repository;

import io.yencute.domain.BillItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the BillItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillItemRepository extends JpaRepository<BillItem, Long> {
    List<BillItem> findByBillUserLogin(String currentUserLogin);

    List<BillItem> findByBillId(Long billId);
}
