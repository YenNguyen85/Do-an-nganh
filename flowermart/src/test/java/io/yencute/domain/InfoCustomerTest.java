package io.yencute.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.yencute.web.rest.TestUtil;

public class InfoCustomerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InfoCustomer.class);
        InfoCustomer infoCustomer1 = new InfoCustomer();
        infoCustomer1.setId(1L);
        InfoCustomer infoCustomer2 = new InfoCustomer();
        infoCustomer2.setId(infoCustomer1.getId());
        assertThat(infoCustomer1).isEqualTo(infoCustomer2);
        infoCustomer2.setId(2L);
        assertThat(infoCustomer1).isNotEqualTo(infoCustomer2);
        infoCustomer1.setId(null);
        assertThat(infoCustomer1).isNotEqualTo(infoCustomer2);
    }
}
