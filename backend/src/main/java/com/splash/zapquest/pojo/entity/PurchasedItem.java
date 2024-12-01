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
@Table(name = "purchased_item")
public class PurchasedItem extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    @Column(nullable = false)
    private Integer price;

    @Column
    private String iconId;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isRedeemed = false;
}
