package com.splash.zapquest.pojo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDto {
    private Long id;
    private String name;
    private Integer bonus;
    private String setup;
    private String procedure;
    private String label;
    private LocalDateTime finishedAt;
    private LocalDateTime createdAt;
}