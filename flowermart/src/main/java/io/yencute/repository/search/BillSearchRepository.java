package io.yencute.repository.search;

import io.yencute.domain.Bill;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Bill} entity.
 */
public interface BillSearchRepository extends ElasticsearchRepository<Bill, Long> {
}
