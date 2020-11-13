package io.yencute.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.yencute.web.rest.TestUtil;

public class ContactInfoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactInfo.class);
        ContactInfo contactInfo1 = new ContactInfo();
        contactInfo1.setId(1L);
        ContactInfo contactInfo2 = new ContactInfo();
        contactInfo2.setId(contactInfo1.getId());
        assertThat(contactInfo1).isEqualTo(contactInfo2);
        contactInfo2.setId(2L);
        assertThat(contactInfo1).isNotEqualTo(contactInfo2);
        contactInfo1.setId(null);
        assertThat(contactInfo1).isNotEqualTo(contactInfo2);
    }
}
