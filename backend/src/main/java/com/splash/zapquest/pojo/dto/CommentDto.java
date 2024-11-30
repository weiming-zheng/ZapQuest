package com.splash.zapquest.pojo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private String content;
    private LocalDateTime createdAt;
}
