package io.yencute.repository.search;

import io.yencute.domain.BillItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link BillItem} entity.
 */
public interface BillItemSearchRepository extends ElasticsearchRepository<BillItem, Long> {
}
