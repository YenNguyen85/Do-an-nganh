package vn.yencute.flowermart.repository.search;

import vn.yencute.flowermart.domain.ContactInfo;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link ContactInfo} entity.
 */
public interface ContactInfoSearchRepository extends ElasticsearchRepository<ContactInfo, Long> {
}
