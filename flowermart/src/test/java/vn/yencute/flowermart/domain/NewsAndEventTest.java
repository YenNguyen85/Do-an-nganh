package vn.yencute.flowermart.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.yencute.flowermart.web.rest.TestUtil;

public class NewsAndEventTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NewsAndEvent.class);
        NewsAndEvent newsAndEvent1 = new NewsAndEvent();
        newsAndEvent1.setId(1L);
        NewsAndEvent newsAndEvent2 = new NewsAndEvent();
        newsAndEvent2.setId(newsAndEvent1.getId());
        assertThat(newsAndEvent1).isEqualTo(newsAndEvent2);
        newsAndEvent2.setId(2L);
        assertThat(newsAndEvent1).isNotEqualTo(newsAndEvent2);
        newsAndEvent1.setId(null);
        assertThat(newsAndEvent1).isNotEqualTo(newsAndEvent2);
    }
}
