package com.splash.zapquest.pojo.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Email;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "parent")
public class Parent extends BaseEntity {
  @Column(nullable = false, unique = true)
  @Email
  private String email;

  @Column(nullable = false)
  private String password;

  @OneToOne(mappedBy = "parent", cascade = CascadeType.ALL, optional = false)
  private Child child;

  @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
  @Builder.Default
  private Set<ShopItem> shopItems = new HashSet<>();


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Parent parent)) return false;
    return getId() != null && Objects.equals(getId(), parent.getId());
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}