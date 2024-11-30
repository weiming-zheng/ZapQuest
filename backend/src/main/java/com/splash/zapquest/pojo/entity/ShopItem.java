package com.splash.zapquest.pojo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shop_item")
public class ShopItem extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private Parent creator;

    @Column(nullable = false)
    private Integer price;

    @Column
    private String iconId; // Placeholder for image storage
}