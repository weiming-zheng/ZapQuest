package com.splash.zapquest.pojo.dto;

import lombok.Data;

@Data
public class PurchasedItemDto {
    private Long id;
    private String name;
    private Integer price;
    private String iconId;
    private Boolean isRedeemed;
}