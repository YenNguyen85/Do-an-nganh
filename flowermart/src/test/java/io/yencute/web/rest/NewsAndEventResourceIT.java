package io.yencute.web.rest;

import io.yencute.FlowermartApp;
import io.yencute.domain.NewsAndEvent;
import io.yencute.repository.NewsAndEventRepository;
import io.yencute.repository.search.NewsAndEventSearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NewsAndEventResource} REST controller.
 */
@SpringBootTest(classes = FlowermartApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NewsAndEventResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private NewsAndEventRepository newsAndEventRepository;

    /**
     * This repository is mocked in the io.yencute.repository.search test package.
     *
     * @see io.yencute.repository.search.NewsAndEventSearchRepositoryMockConfiguration
     */
    @Autowired
    private NewsAndEventSearchRepository mockNewsAndEventSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNewsAndEventMockMvc;

    private NewsAndEvent newsAndEvent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsAndEvent createEntity(EntityManager em) {
        NewsAndEvent newsAndEvent = new NewsAndEvent()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .time(DEFAULT_TIME);
        return newsAndEvent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NewsAndEvent createUpdatedEntity(EntityManager em) {
        NewsAndEvent newsAndEvent = new NewsAndEvent()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .time(UPDATED_TIME);
        return newsAndEvent;
    }

    @BeforeEach
    public void initTest() {
        newsAndEvent = createEntity(em);
    }

    @Test
    @Transactional
    public void createNewsAndEvent() throws Exception {
        int databaseSizeBeforeCreate = newsAndEventRepository.findAll().size();
        // Create the NewsAndEvent
        restNewsAndEventMockMvc.perform(post("/api/news-and-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(newsAndEvent)))
            .andExpect(status().isCreated());

        // Validate the NewsAndEvent in the database
        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeCreate + 1);
        NewsAndEvent testNewsAndEvent = newsAndEventList.get(newsAndEventList.size() - 1);
        assertThat(testNewsAndEvent.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNewsAndEvent.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testNewsAndEvent.getTime()).isEqualTo(DEFAULT_TIME);

        // Validate the NewsAndEvent in Elasticsearch
        verify(mockNewsAndEventSearchRepository, times(1)).save(testNewsAndEvent);
    }

    @Test
    @Transactional
    public void createNewsAndEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = newsAndEventRepository.findAll().size();

        // Create the NewsAndEvent with an existing ID
        newsAndEvent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNewsAndEventMockMvc.perform(post("/api/news-and-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(newsAndEvent)))
            .andExpect(status().isBadRequest());

        // Validate the NewsAndEvent in the database
        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeCreate);

        // Validate the NewsAndEvent in Elasticsearch
        verify(mockNewsAndEventSearchRepository, times(0)).save(newsAndEvent);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = newsAndEventRepository.findAll().size();
        // set the field null
        newsAndEvent.setTitle(null);

        // Create the NewsAndEvent, which fails.


        restNewsAndEventMockMvc.perform(post("/api/news-and-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(newsAndEvent)))
            .andExpect(status().isBadRequest());

        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNewsAndEvents() throws Exception {
        // Initialize the database
        newsAndEventRepository.saveAndFlush(newsAndEvent);

        // Get all the newsAndEventList
        restNewsAndEventMockMvc.perform(get("/api/news-and-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsAndEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getNewsAndEvent() throws Exception {
        // Initialize the database
        newsAndEventRepository.saveAndFlush(newsAndEvent);

        // Get the newsAndEvent
        restNewsAndEventMockMvc.perform(get("/api/news-and-events/{id}", newsAndEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(newsAndEvent.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNewsAndEvent() throws Exception {
        // Get the newsAndEvent
        restNewsAndEventMockMvc.perform(get("/api/news-and-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNewsAndEvent() throws Exception {
        // Initialize the database
        newsAndEventRepository.saveAndFlush(newsAndEvent);

        int databaseSizeBeforeUpdate = newsAndEventRepository.findAll().size();

        // Update the newsAndEvent
        NewsAndEvent updatedNewsAndEvent = newsAndEventRepository.findById(newsAndEvent.getId()).get();
        // Disconnect from session so that the updates on updatedNewsAndEvent are not directly saved in db
        em.detach(updatedNewsAndEvent);
        updatedNewsAndEvent
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .time(UPDATED_TIME);

        restNewsAndEventMockMvc.perform(put("/api/news-and-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNewsAndEvent)))
            .andExpect(status().isOk());

        // Validate the NewsAndEvent in the database
        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeUpdate);
        NewsAndEvent testNewsAndEvent = newsAndEventList.get(newsAndEventList.size() - 1);
        assertThat(testNewsAndEvent.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNewsAndEvent.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testNewsAndEvent.getTime()).isEqualTo(UPDATED_TIME);

        // Validate the NewsAndEvent in Elasticsearch
        verify(mockNewsAndEventSearchRepository, times(1)).save(testNewsAndEvent);
    }

    @Test
    @Transactional
    public void updateNonExistingNewsAndEvent() throws Exception {
        int databaseSizeBeforeUpdate = newsAndEventRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNewsAndEventMockMvc.perform(put("/api/news-and-events")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(newsAndEvent)))
            .andExpect(status().isBadRequest());

        // Validate the NewsAndEvent in the database
        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NewsAndEvent in Elasticsearch
        verify(mockNewsAndEventSearchRepository, times(0)).save(newsAndEvent);
    }

    @Test
    @Transactional
    public void deleteNewsAndEvent() throws Exception {
        // Initialize the database
        newsAndEventRepository.saveAndFlush(newsAndEvent);

        int databaseSizeBeforeDelete = newsAndEventRepository.findAll().size();

        // Delete the newsAndEvent
        restNewsAndEventMockMvc.perform(delete("/api/news-and-events/{id}", newsAndEvent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NewsAndEvent> newsAndEventList = newsAndEventRepository.findAll();
        assertThat(newsAndEventList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NewsAndEvent in Elasticsearch
        verify(mockNewsAndEventSearchRepository, times(1)).deleteById(newsAndEvent.getId());
    }

    @Test
    @Transactional
    public void searchNewsAndEvent() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        newsAndEventRepository.saveAndFlush(newsAndEvent);
        when(mockNewsAndEventSearchRepository.search(queryStringQuery("id:" + newsAndEvent.getId())))
            .thenReturn(Collections.singletonList(newsAndEvent));

        // Search the newsAndEvent
        restNewsAndEventMockMvc.perform(get("/api/_search/news-and-events?query=id:" + newsAndEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(newsAndEvent.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
}
