package vn.yencute.flowermart.repository.search;

import vn.yencute.flowermart.domain.Category;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Category} entity.
 */
public interface CategorySearchRepository extends ElasticsearchRepository<Category, Long> {
}
