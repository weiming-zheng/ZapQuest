package com.splash.zapquest.pojo.vo;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Data
public class ShopItemUpdateVo {
    private String name;
    private Integer price;
    private String iconId;
}