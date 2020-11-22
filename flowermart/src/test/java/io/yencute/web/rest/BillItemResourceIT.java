package io.yencute.web.rest;

import io.yencute.FlowermartApp;
import io.yencute.domain.BillItem;
import io.yencute.repository.BillItemRepository;

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

import io.yencute.domain.enumeration.BillItemStatus;
/**
 * Integration tests for the {@link BillItemResource} REST controller.
 */
@SpringBootTest(classes = FlowermartApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BillItemResourceIT {

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final BillItemStatus DEFAULT_STATUS = BillItemStatus.AVAILABLE;
    private static final BillItemStatus UPDATED_STATUS = BillItemStatus.OUT_OF_STOCK;

    @Autowired
    private BillItemRepository billItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBillItemMockMvc;

    private BillItem billItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BillItem createEntity(EntityManager em) {
        BillItem billItem = new BillItem()
            .quantity(DEFAULT_QUANTITY)
            .status(DEFAULT_STATUS);
        return billItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BillItem createUpdatedEntity(EntityManager em) {
        BillItem billItem = new BillItem()
            .quantity(UPDATED_QUANTITY)
            .status(UPDATED_STATUS);
        return billItem;
    }

    @BeforeEach
    public void initTest() {
        billItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createBillItem() throws Exception {
        int databaseSizeBeforeCreate = billItemRepository.findAll().size();
        // Create the BillItem
        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isCreated());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeCreate + 1);
        BillItem testBillItem = billItemList.get(billItemList.size() - 1);
        assertThat(testBillItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testBillItem.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBillItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = billItemRepository.findAll().size();

        // Create the BillItem with an existing ID
        billItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isBadRequest());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = billItemRepository.findAll().size();
        // set the field null
        billItem.setQuantity(null);

        // Create the BillItem, which fails.


        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isBadRequest());

        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = billItemRepository.findAll().size();
        // set the field null
        billItem.setStatus(null);

        // Create the BillItem, which fails.


        restBillItemMockMvc.perform(post("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isBadRequest());

        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBillItems() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        // Get all the billItemList
        restBillItemMockMvc.perform(get("/api/bill-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(billItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        // Get the billItem
        restBillItemMockMvc.perform(get("/api/bill-items/{id}", billItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(billItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBillItem() throws Exception {
        // Get the billItem
        restBillItemMockMvc.perform(get("/api/bill-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        int databaseSizeBeforeUpdate = billItemRepository.findAll().size();

        // Update the billItem
        BillItem updatedBillItem = billItemRepository.findById(billItem.getId()).get();
        // Disconnect from session so that the updates on updatedBillItem are not directly saved in db
        em.detach(updatedBillItem);
        updatedBillItem
            .quantity(UPDATED_QUANTITY)
            .status(UPDATED_STATUS);

        restBillItemMockMvc.perform(put("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBillItem)))
            .andExpect(status().isOk());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeUpdate);
        BillItem testBillItem = billItemList.get(billItemList.size() - 1);
        assertThat(testBillItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testBillItem.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBillItem() throws Exception {
        int databaseSizeBeforeUpdate = billItemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBillItemMockMvc.perform(put("/api/bill-items")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(billItem)))
            .andExpect(status().isBadRequest());

        // Validate the BillItem in the database
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBillItem() throws Exception {
        // Initialize the database
        billItemRepository.saveAndFlush(billItem);

        int databaseSizeBeforeDelete = billItemRepository.findAll().size();

        // Delete the billItem
        restBillItemMockMvc.perform(delete("/api/bill-items/{id}", billItem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BillItem> billItemList = billItemRepository.findAll();
        assertThat(billItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
