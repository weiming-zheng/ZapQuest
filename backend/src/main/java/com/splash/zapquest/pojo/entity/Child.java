package com.splash.zapquest.pojo.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "child")
public class Child extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String loginCode;

    @Column
    private String name;

    @OneToOne(optional = false)
    @JoinColumn(nullable = false)
    private Parent parent;

    @Column(nullable = false)
    @Builder.Default
    private Integer coinBalance = 0;

    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<PurchasedItem> purchasedItems = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Child child)) return false;
        return getId() != null && Objects.equals(getId(), child.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}