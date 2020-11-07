package io.yencute.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link BillItemSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BillItemSearchRepositoryMockConfiguration {

    @MockBean
    private BillItemSearchRepository mockBillItemSearchRepository;

}
