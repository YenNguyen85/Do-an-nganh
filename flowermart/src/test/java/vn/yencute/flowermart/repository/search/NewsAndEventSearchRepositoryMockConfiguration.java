package vn.yencute.flowermart.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link NewsAndEventSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class NewsAndEventSearchRepositoryMockConfiguration {

    @MockBean
    private NewsAndEventSearchRepository mockNewsAndEventSearchRepository;

}
