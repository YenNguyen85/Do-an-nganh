package vn.yencute.flowermart.repository.search;

import vn.yencute.flowermart.domain.BillItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link BillItem} entity.
 */
public interface BillItemSearchRepository extends ElasticsearchRepository<BillItem, Long> {
}
