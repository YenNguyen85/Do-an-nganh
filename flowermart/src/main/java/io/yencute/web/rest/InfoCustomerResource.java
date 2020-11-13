package io.yencute.web.rest;

import io.yencute.domain.InfoCustomer;
import io.yencute.repository.InfoCustomerRepository;
import io.yencute.web.rest.errors.BadRequestAlertException;

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

/**
 * REST controller for managing {@link io.yencute.domain.InfoCustomer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InfoCustomerResource {

    private final Logger log = LoggerFactory.getLogger(InfoCustomerResource.class);

    private static final String ENTITY_NAME = "infoCustomer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InfoCustomerRepository infoCustomerRepository;

    public InfoCustomerResource(InfoCustomerRepository infoCustomerRepository) {
        this.infoCustomerRepository = infoCustomerRepository;
    }

    /**
     * {@code POST  /info-customers} : Create a new infoCustomer.
     *
     * @param infoCustomer the infoCustomer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new infoCustomer, or with status {@code 400 (Bad Request)} if the infoCustomer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/info-customers")
    public ResponseEntity<InfoCustomer> createInfoCustomer(@Valid @RequestBody InfoCustomer infoCustomer) throws URISyntaxException {
        log.debug("REST request to save InfoCustomer : {}", infoCustomer);
        if (infoCustomer.getId() != null) {
            throw new BadRequestAlertException("A new infoCustomer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InfoCustomer result = infoCustomerRepository.save(infoCustomer);
        return ResponseEntity.created(new URI("/api/info-customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /info-customers} : Updates an existing infoCustomer.
     *
     * @param infoCustomer the infoCustomer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infoCustomer,
     * or with status {@code 400 (Bad Request)} if the infoCustomer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the infoCustomer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/info-customers")
    public ResponseEntity<InfoCustomer> updateInfoCustomer(@Valid @RequestBody InfoCustomer infoCustomer) throws URISyntaxException {
        log.debug("REST request to update InfoCustomer : {}", infoCustomer);
        if (infoCustomer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InfoCustomer result = infoCustomerRepository.save(infoCustomer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, infoCustomer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /info-customers} : get all the infoCustomers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of infoCustomers in body.
     */
    @GetMapping("/info-customers")
    public List<InfoCustomer> getAllInfoCustomers() {
        log.debug("REST request to get all InfoCustomers");
        return infoCustomerRepository.findAll();
    }

    /**
     * {@code GET  /info-customers/:id} : get the "id" infoCustomer.
     *
     * @param id the id of the infoCustomer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the infoCustomer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/info-customers/{id}")
    public ResponseEntity<InfoCustomer> getInfoCustomer(@PathVariable Long id) {
        log.debug("REST request to get InfoCustomer : {}", id);
        Optional<InfoCustomer> infoCustomer = infoCustomerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(infoCustomer);
    }

    /**
     * {@code DELETE  /info-customers/:id} : delete the "id" infoCustomer.
     *
     * @param id the id of the infoCustomer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/info-customers/{id}")
    public ResponseEntity<Void> deleteInfoCustomer(@PathVariable Long id) {
        log.debug("REST request to delete InfoCustomer : {}", id);
        infoCustomerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
