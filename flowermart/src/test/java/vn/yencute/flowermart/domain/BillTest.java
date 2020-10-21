package vn.yencute.flowermart.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.yencute.flowermart.web.rest.TestUtil;

public class BillTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bill.class);
        Bill bill1 = new Bill();
        bill1.setId(1L);
        Bill bill2 = new Bill();
        bill2.setId(bill1.getId());
        assertThat(bill1).isEqualTo(bill2);
        bill2.setId(2L);
        assertThat(bill1).isNotEqualTo(bill2);
        bill1.setId(null);
        assertThat(bill1).isNotEqualTo(bill2);
    }
}
