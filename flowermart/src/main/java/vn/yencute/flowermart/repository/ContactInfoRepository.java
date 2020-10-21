package vn.yencute.flowermart.repository;

import vn.yencute.flowermart.domain.ContactInfo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ContactInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long> {
}
