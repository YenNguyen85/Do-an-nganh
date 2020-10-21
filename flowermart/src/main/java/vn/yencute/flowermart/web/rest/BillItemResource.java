package vn.yencute.flowermart.web.rest;

import vn.yencute.flowermart.domain.BillItem;
import vn.yencute.flowermart.repository.BillItemRepository;
import vn.yencute.flowermart.repository.search.BillItemSearchRepository;
import vn.yencute.flowermart.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link vn.yencute.flowermart.domain.BillItem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BillItemResource {

    private final Logger log = LoggerFactory.getLogger(BillItemResource.class);

    private static final String ENTITY_NAME = "billItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BillItemRepository billItemRepository;

    private final BillItemSearchRepository billItemSearchRepository;

    public BillItemResource(BillItemRepository billItemRepository, BillItemSearchRepository billItemSearchRepository) {
        this.billItemRepository = billItemRepository;
        this.billItemSearchRepository = billItemSearchRepository;
    }

    /**
     * {@code POST  /bill-items} : Create a new billItem.
     *
     * @param billItem the billItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new billItem, or with status {@code 400 (Bad Request)} if the billItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bill-items")
    public ResponseEntity<BillItem> createBillItem(@Valid @RequestBody BillItem billItem) throws URISyntaxException {
        log.debug("REST request to save BillItem : {}", billItem);
        if (billItem.getId() != null) {
            throw new BadRequestAlertException("A new billItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BillItem result = billItemRepository.save(billItem);
        billItemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/bill-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bill-items} : Updates an existing billItem.
     *
     * @param billItem the billItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated billItem,
     * or with status {@code 400 (Bad Request)} if the billItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the billItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bill-items")
    public ResponseEntity<BillItem> updateBillItem(@Valid @RequestBody BillItem billItem) throws URISyntaxException {
        log.debug("REST request to update BillItem : {}", billItem);
        if (billItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BillItem result = billItemRepository.save(billItem);
        billItemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, billItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bill-items} : get all the billItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of billItems in body.
     */
    @GetMapping("/bill-items")
    public List<BillItem> getAllBillItems() {
        log.debug("REST request to get all BillItems");
        return billItemRepository.findAll();
    }

    /**
     * {@code GET  /bill-items/:id} : get the "id" billItem.
     *
     * @param id the id of the billItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the billItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bill-items/{id}")
    public ResponseEntity<BillItem> getBillItem(@PathVariable Long id) {
        log.debug("REST request to get BillItem : {}", id);
        Optional<BillItem> billItem = billItemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(billItem);
    }

    /**
     * {@code DELETE  /bill-items/:id} : delete the "id" billItem.
     *
     * @param id the id of the billItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bill-items/{id}")
    public ResponseEntity<Void> deleteBillItem(@PathVariable Long id) {
        log.debug("REST request to delete BillItem : {}", id);
        billItemRepository.deleteById(id);
        billItemSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/bill-items?query=:query} : search for the billItem corresponding
     * to the query.
     *
     * @param query the query of the billItem search.
     * @return the result of the search.
     */
    @GetMapping("/_search/bill-items")
    public List<BillItem> searchBillItems(@RequestParam String query) {
        log.debug("REST request to search BillItems for query {}", query);
        return StreamSupport
            .stream(billItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}