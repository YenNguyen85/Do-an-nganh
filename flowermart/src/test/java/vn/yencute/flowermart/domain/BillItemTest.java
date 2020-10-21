package vn.yencute.flowermart.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import vn.yencute.flowermart.web.rest.TestUtil;

public class BillItemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BillItem.class);
        BillItem billItem1 = new BillItem();
        billItem1.setId(1L);
        BillItem billItem2 = new BillItem();
        billItem2.setId(billItem1.getId());
        assertThat(billItem1).isEqualTo(billItem2);
        billItem2.setId(2L);
        assertThat(billItem1).isNotEqualTo(billItem2);
        billItem1.setId(null);
        assertThat(billItem1).isNotEqualTo(billItem2);
    }
}
