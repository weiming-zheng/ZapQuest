package com.splash.zapquest.server.service;

import com.splash.zapquest.common.constant.JwtClaimsConstant;
import com.splash.zapquest.common.exception.InsufficientCoinsException;
import com.splash.zapquest.common.exception.UnauthorizedOperationException;
import com.splash.zapquest.pojo.dto.PurchasedItemDto;
import com.splash.zapquest.pojo.dto.ShopItemDto;
import com.splash.zapquest.pojo.entity.Child;
import com.splash.zapquest.pojo.entity.Parent;
import com.splash.zapquest.pojo.entity.PurchasedItem;
import com.splash.zapquest.pojo.entity.ShopItem;
import com.splash.zapquest.pojo.vo.ShopItemUpdateVo;
import com.splash.zapquest.server.repo.ChildRepository;
import com.splash.zapquest.server.repo.ParentRepository;
import com.splash.zapquest.server.repo.PurchasedItemRepository;
import com.splash.zapquest.server.repo.ShopItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RewardService {
    private final ShopItemRepository shopItemRepository;
    private final PurchasedItemRepository purchasedItemRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;

    public List<ShopItemDto> getAllShopItems(String userType, Long userId) {
        if (userType.equals(JwtClaimsConstant.PARENT_ID)) {
            // Parents only see their own shop items
            return shopItemRepository.findAll().stream()
                    .filter(item -> !item.getIsDeleted() && item.getCreator().getId().equals(userId))
                    .map(this::convertToShopItemDto)
                    .collect(Collectors.toList());
        } else {
            // Children see all non-deleted shop items
            return shopItemRepository.findAll().stream()
                    .filter(item -> !item.getIsDeleted())
                    .map(this::convertToShopItemDto)
                    .collect(Collectors.toList());
        }
    }

    @Transactional
    public ShopItemDto createShopItem(ShopItemUpdateVo shopItemUpdateVo, Long parentId) {
        Parent parent = parentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        ShopItem shopItem = ShopItem.builder()
                .name(shopItemUpdateVo.getName())
                .iconId(shopItemUpdateVo.getIconId())
                .price(shopItemUpdateVo.getPrice())
                .creator(parent)
                .build();

        ShopItem savedItem = shopItemRepository.save(shopItem);
        return convertToShopItemDto(savedItem);
    }

    @Transactional
    public ShopItemDto updateShopItem(Long shopItemId, ShopItemUpdateVo shopItemUpdateVo, Long parentId) {
        ShopItem shopItem = shopItemRepository.findById(shopItemId)
                .orElseThrow(() -> new RuntimeException("Shop item not found"));

        if (!shopItem.getCreator().getId().equals(parentId)) {
            throw new UnauthorizedOperationException("You can only update your own shop items");
        }

        if (shopItemUpdateVo.getName() != null) {
            shopItem.setName(shopItemUpdateVo.getName());
        }
        if (shopItemUpdateVo.getPrice() != null) {
            shopItem.setPrice(shopItemUpdateVo.getPrice());
        }
        if (shopItemUpdateVo.getIconId() != null) {
            shopItem.setIconId(shopItemUpdateVo.getIconId());
        }


        ShopItem updatedItem = shopItemRepository.save(shopItem);
        return convertToShopItemDto(updatedItem);
    }

    @Transactional
    public void deleteShopItem(Long shopItemId, Long parentId) {
        ShopItem shopItem = shopItemRepository.findById(shopItemId)
                .orElseThrow(() -> new RuntimeException("Shop item not found"));

        if (!shopItem.getCreator().getId().equals(parentId)) {
            throw new UnauthorizedOperationException("You can only delete your own shop items");
        }

        shopItem.setIsDeleted(true);
        shopItemRepository.save(shopItem);
    }

    @Transactional
    public PurchasedItemDto purchaseShopItem(Long shopItemId, Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));

        ShopItem shopItem = shopItemRepository.findById(shopItemId)
                .orElseThrow(() -> new RuntimeException("Shop item not found"));

        if (child.getCoinBalance() < shopItem.getPrice()) {
            throw new InsufficientCoinsException("Not enough coins to purchase this item");
        }

        child.setCoinBalance(child.getCoinBalance() - shopItem.getPrice());
        childRepository.save(child);

        PurchasedItem purchasedItem = PurchasedItem.builder()
                .name(shopItem.getName())
                .price(shopItem.getPrice())
                .child(child)
                .iconId(shopItem.getIconId())
                .isRedeemed(false)
                .build();

        PurchasedItem savedItem = purchasedItemRepository.save(purchasedItem);
        return convertToPurchasedItemDto(savedItem);
    }

    public List<PurchasedItemDto> getAllPurchasedItems(String userType, Long userId) {
        List<PurchasedItem> items;
        if (userType.equals(JwtClaimsConstant.PARENT_ID)) {
            Parent parent = parentRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            items = purchasedItemRepository.findAllByChildParentAndIsDeletedFalse(parent);
        } else {
            Child child = childRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Child not found"));
            items = purchasedItemRepository.findAllByChildAndIsDeletedFalse(child);
        }

        return items.stream()
                .map(this::convertToPurchasedItemDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void redeemPurchasedItem(Long purchasedItemId, String userType, Long userId) {
        PurchasedItem purchasedItem = purchasedItemRepository.findById(purchasedItemId)
                .orElseThrow(() -> new RuntimeException("Purchased item not found"));

        // Verify access rights
        if (userType.equals(JwtClaimsConstant.PARENT_ID)) {
            if (!purchasedItem.getChild().getParent().getId().equals(userId)) {
                throw new UnauthorizedOperationException("You can only redeem items for your child");
            }
        } else {
            if (!purchasedItem.getChild().getId().equals(userId)) {
                throw new UnauthorizedOperationException("You can only redeem your own items");
            }
        }

        purchasedItem.setIsRedeemed(true);
        purchasedItemRepository.save(purchasedItem);
    }

    private ShopItemDto convertToShopItemDto(ShopItem shopItem) {
        ShopItemDto dto = new ShopItemDto();
        BeanUtils.copyProperties(shopItem, dto);
        return dto;
    }

    private PurchasedItemDto convertToPurchasedItemDto(PurchasedItem purchasedItem) {
        PurchasedItemDto dto = new PurchasedItemDto();
        BeanUtils.copyProperties(purchasedItem, dto);
        return dto;
    }
}