package com.cloudspend.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController{

    @GetMapping("/api/health")
    public HealthResponse getHealth(){
        return new HealthResponse("UP", "CloudSpend");
    }
}