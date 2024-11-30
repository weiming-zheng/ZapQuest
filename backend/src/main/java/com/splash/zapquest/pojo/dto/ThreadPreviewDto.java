package com.splash.zapquest.pojo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ThreadPreviewDto {
    private Long id;
    private String title;
    private Long like; // How many likes this thread has got
    private Boolean hasLiked; // If the requesting parent has liked this thread
    private LocalDateTime createdAt;
}
