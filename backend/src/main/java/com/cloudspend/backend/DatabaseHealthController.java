package com.cloudspend.backend;

import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class DatabaseHealthController {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseHealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/database")
    public ResponseEntity<Map<String, String>> checkDatabase() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);

            if (Integer.valueOf(1).equals(result)) {
                return ResponseEntity.ok(Map.of(
                        "status", "UP",
                        "database", "PostgreSQL"
                ));
            }

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                    "status", "DOWN",
                    "database", "PostgreSQL",
                    "message", "Database health query returned an unexpected result"
            ));
        } catch (DataAccessException exception) {
            // Do not expose connection details or credentials in an HTTP response.
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                    "status", "DOWN",
                    "database", "PostgreSQL",
                    "message", "Database query failed"
            ));
        }
    }
}
