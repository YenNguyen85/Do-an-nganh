package io.yencute.repository.search;

import io.yencute.domain.NewsAndEvent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link NewsAndEvent} entity.
 */
public interface NewsAndEventSearchRepository extends ElasticsearchRepository<NewsAndEvent, Long> {
}
