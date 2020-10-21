package vn.yencute.flowermart.web.rest;

import vn.yencute.flowermart.domain.NewsAndEvent;
import vn.yencute.flowermart.repository.NewsAndEventRepository;
import vn.yencute.flowermart.repository.search.NewsAndEventSearchRepository;
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
 * REST controller for managing {@link vn.yencute.flowermart.domain.NewsAndEvent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NewsAndEventResource {

    private final Logger log = LoggerFactory.getLogger(NewsAndEventResource.class);

    private static final String ENTITY_NAME = "newsAndEvent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsAndEventRepository newsAndEventRepository;

    private final NewsAndEventSearchRepository newsAndEventSearchRepository;

    public NewsAndEventResource(NewsAndEventRepository newsAndEventRepository, NewsAndEventSearchRepository newsAndEventSearchRepository) {
        this.newsAndEventRepository = newsAndEventRepository;
        this.newsAndEventSearchRepository = newsAndEventSearchRepository;
    }

    /**
     * {@code POST  /news-and-events} : Create a new newsAndEvent.
     *
     * @param newsAndEvent the newsAndEvent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new newsAndEvent, or with status {@code 400 (Bad Request)} if the newsAndEvent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news-and-events")
    public ResponseEntity<NewsAndEvent> createNewsAndEvent(@Valid @RequestBody NewsAndEvent newsAndEvent) throws URISyntaxException {
        log.debug("REST request to save NewsAndEvent : {}", newsAndEvent);
        if (newsAndEvent.getId() != null) {
            throw new BadRequestAlertException("A new newsAndEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NewsAndEvent result = newsAndEventRepository.save(newsAndEvent);
        newsAndEventSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/news-and-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /news-and-events} : Updates an existing newsAndEvent.
     *
     * @param newsAndEvent the newsAndEvent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated newsAndEvent,
     * or with status {@code 400 (Bad Request)} if the newsAndEvent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the newsAndEvent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news-and-events")
    public ResponseEntity<NewsAndEvent> updateNewsAndEvent(@Valid @RequestBody NewsAndEvent newsAndEvent) throws URISyntaxException {
        log.debug("REST request to update NewsAndEvent : {}", newsAndEvent);
        if (newsAndEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NewsAndEvent result = newsAndEventRepository.save(newsAndEvent);
        newsAndEventSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, newsAndEvent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /news-and-events} : get all the newsAndEvents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of newsAndEvents in body.
     */
    @GetMapping("/news-and-events")
    public List<NewsAndEvent> getAllNewsAndEvents() {
        log.debug("REST request to get all NewsAndEvents");
        return newsAndEventRepository.findAll();
    }

    /**
     * {@code GET  /news-and-events/:id} : get the "id" newsAndEvent.
     *
     * @param id the id of the newsAndEvent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the newsAndEvent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news-and-events/{id}")
    public ResponseEntity<NewsAndEvent> getNewsAndEvent(@PathVariable Long id) {
        log.debug("REST request to get NewsAndEvent : {}", id);
        Optional<NewsAndEvent> newsAndEvent = newsAndEventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(newsAndEvent);
    }

    /**
     * {@code DELETE  /news-and-events/:id} : delete the "id" newsAndEvent.
     *
     * @param id the id of the newsAndEvent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news-and-events/{id}")
    public ResponseEntity<Void> deleteNewsAndEvent(@PathVariable Long id) {
        log.debug("REST request to delete NewsAndEvent : {}", id);
        newsAndEventRepository.deleteById(id);
        newsAndEventSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/news-and-events?query=:query} : search for the newsAndEvent corresponding
     * to the query.
     *
     * @param query the query of the newsAndEvent search.
     * @return the result of the search.
     */
    @GetMapping("/_search/news-and-events")
    public List<NewsAndEvent> searchNewsAndEvents(@RequestParam String query) {
        log.debug("REST request to search NewsAndEvents for query {}", query);
        return StreamSupport
            .stream(newsAndEventSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
