package vn.yencute.flowermart.repository.search;

import vn.yencute.flowermart.domain.NewsAndEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link NewsAndEvent} entity.
 */
public interface NewsAndEventSearchRepository extends ElasticsearchRepository<NewsAndEvent, Long> {
}
