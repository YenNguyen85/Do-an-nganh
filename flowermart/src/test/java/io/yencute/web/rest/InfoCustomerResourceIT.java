package io.yencute.web.rest;

import io.yencute.FlowermartApp;
import io.yencute.domain.InfoCustomer;
import io.yencute.repository.InfoCustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.yencute.domain.enumeration.Gender;
/**
 * Integration tests for the {@link InfoCustomerResource} REST controller.
 */
@SpringBootTest(classes = FlowermartApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InfoCustomerResourceIT {

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    @Autowired
    private InfoCustomerRepository infoCustomerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInfoCustomerMockMvc;

    private InfoCustomer infoCustomer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InfoCustomer createEntity(EntityManager em) {
        InfoCustomer infoCustomer = new InfoCustomer()
            .gender(DEFAULT_GENDER)
            .phone(DEFAULT_PHONE)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY);
        return infoCustomer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InfoCustomer createUpdatedEntity(EntityManager em) {
        InfoCustomer infoCustomer = new InfoCustomer()
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);
        return infoCustomer;
    }

    @BeforeEach
    public void initTest() {
        infoCustomer = createEntity(em);
    }

    @Test
    @Transactional
    public void createInfoCustomer() throws Exception {
        int databaseSizeBeforeCreate = infoCustomerRepository.findAll().size();
        // Create the InfoCustomer
        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isCreated());

        // Validate the InfoCustomer in the database
        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeCreate + 1);
        InfoCustomer testInfoCustomer = infoCustomerList.get(infoCustomerList.size() - 1);
        assertThat(testInfoCustomer.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testInfoCustomer.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testInfoCustomer.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testInfoCustomer.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testInfoCustomer.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testInfoCustomer.getCountry()).isEqualTo(DEFAULT_COUNTRY);
    }

    @Test
    @Transactional
    public void createInfoCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = infoCustomerRepository.findAll().size();

        // Create the InfoCustomer with an existing ID
        infoCustomer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        // Validate the InfoCustomer in the database
        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = infoCustomerRepository.findAll().size();
        // set the field null
        infoCustomer.setGender(null);

        // Create the InfoCustomer, which fails.


        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = infoCustomerRepository.findAll().size();
        // set the field null
        infoCustomer.setPhone(null);

        // Create the InfoCustomer, which fails.


        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressLine1IsRequired() throws Exception {
        int databaseSizeBeforeTest = infoCustomerRepository.findAll().size();
        // set the field null
        infoCustomer.setAddressLine1(null);

        // Create the InfoCustomer, which fails.


        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = infoCustomerRepository.findAll().size();
        // set the field null
        infoCustomer.setCity(null);

        // Create the InfoCustomer, which fails.


        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = infoCustomerRepository.findAll().size();
        // set the field null
        infoCustomer.setCountry(null);

        // Create the InfoCustomer, which fails.


        restInfoCustomerMockMvc.perform(post("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInfoCustomers() throws Exception {
        // Initialize the database
        infoCustomerRepository.saveAndFlush(infoCustomer);

        // Get all the infoCustomerList
        restInfoCustomerMockMvc.perform(get("/api/info-customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(infoCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)));
    }
    
    @Test
    @Transactional
    public void getInfoCustomer() throws Exception {
        // Initialize the database
        infoCustomerRepository.saveAndFlush(infoCustomer);

        // Get the infoCustomer
        restInfoCustomerMockMvc.perform(get("/api/info-customers/{id}", infoCustomer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(infoCustomer.getId().intValue()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY));
    }
    @Test
    @Transactional
    public void getNonExistingInfoCustomer() throws Exception {
        // Get the infoCustomer
        restInfoCustomerMockMvc.perform(get("/api/info-customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInfoCustomer() throws Exception {
        // Initialize the database
        infoCustomerRepository.saveAndFlush(infoCustomer);

        int databaseSizeBeforeUpdate = infoCustomerRepository.findAll().size();

        // Update the infoCustomer
        InfoCustomer updatedInfoCustomer = infoCustomerRepository.findById(infoCustomer.getId()).get();
        // Disconnect from session so that the updates on updatedInfoCustomer are not directly saved in db
        em.detach(updatedInfoCustomer);
        updatedInfoCustomer
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);

        restInfoCustomerMockMvc.perform(put("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInfoCustomer)))
            .andExpect(status().isOk());

        // Validate the InfoCustomer in the database
        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeUpdate);
        InfoCustomer testInfoCustomer = infoCustomerList.get(infoCustomerList.size() - 1);
        assertThat(testInfoCustomer.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testInfoCustomer.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testInfoCustomer.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testInfoCustomer.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testInfoCustomer.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testInfoCustomer.getCountry()).isEqualTo(UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingInfoCustomer() throws Exception {
        int databaseSizeBeforeUpdate = infoCustomerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInfoCustomerMockMvc.perform(put("/api/info-customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(infoCustomer)))
            .andExpect(status().isBadRequest());

        // Validate the InfoCustomer in the database
        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInfoCustomer() throws Exception {
        // Initialize the database
        infoCustomerRepository.saveAndFlush(infoCustomer);

        int databaseSizeBeforeDelete = infoCustomerRepository.findAll().size();

        // Delete the infoCustomer
        restInfoCustomerMockMvc.perform(delete("/api/info-customers/{id}", infoCustomer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InfoCustomer> infoCustomerList = infoCustomerRepository.findAll();
        assertThat(infoCustomerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
