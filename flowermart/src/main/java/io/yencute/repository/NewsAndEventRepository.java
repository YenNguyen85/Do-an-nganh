package io.yencute.repository;

import io.yencute.domain.NewsAndEvent;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

/**
 * Spring Data  repository for the NewsAndEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsAndEventRepository extends JpaRepository<NewsAndEvent, Long> {
}
