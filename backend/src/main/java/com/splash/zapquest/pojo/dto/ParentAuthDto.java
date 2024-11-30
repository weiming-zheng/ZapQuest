package com.splash.zapquest.pojo.dto;

import lombok.Data;

@Data
public class ParentAuthDto {
    private String token;
    private String childLoginCode;
}
