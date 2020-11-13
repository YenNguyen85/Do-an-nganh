package io.yencute.repository;

import io.yencute.domain.InfoCustomer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InfoCustomer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfoCustomerRepository extends JpaRepository<InfoCustomer, Long> {
}
