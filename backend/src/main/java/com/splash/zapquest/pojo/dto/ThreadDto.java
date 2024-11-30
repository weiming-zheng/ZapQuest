package com.splash.zapquest.pojo.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
public class ThreadDto {
    private Long id;
    private String title;
    private String content;
    private Long like; // How many likes this thread has got
    private Boolean hasLiked; // If the requesting parent has liked this thread
    private Set<CommentDto> comments = new HashSet<>();
    private LocalDateTime createdAt;
}
