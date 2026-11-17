package com.cloudspend.backend;

public record HealthResponse(
        String status,
        String application
) {
}