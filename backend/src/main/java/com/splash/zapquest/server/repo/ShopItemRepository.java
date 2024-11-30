package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.ShopItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopItemRepository extends JpaRepository<ShopItem, Long> {
}