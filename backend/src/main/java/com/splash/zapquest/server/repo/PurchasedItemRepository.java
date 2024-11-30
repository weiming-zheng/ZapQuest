package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.Child;
import com.splash.zapquest.pojo.entity.Parent;
import com.splash.zapquest.pojo.entity.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Long> {
    List<PurchasedItem> findAllByChildAndIsDeletedFalse(Child child);
    List<PurchasedItem> findAllByChildParentAndIsDeletedFalse(Parent parent);
}