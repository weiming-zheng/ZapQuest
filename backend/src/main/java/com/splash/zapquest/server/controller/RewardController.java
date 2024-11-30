package com.splash.zapquest.server.controller;

import com.splash.zapquest.common.constant.JwtClaimsConstant;
import com.splash.zapquest.common.context.BaseContext;
import com.splash.zapquest.common.result.Result;
import com.splash.zapquest.pojo.dto.PurchasedItemDto;
import com.splash.zapquest.pojo.dto.ShopItemDto;
import com.splash.zapquest.pojo.vo.ShopItemUpdateVo;
import com.splash.zapquest.server.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reward")
@RequiredArgsConstructor
public class RewardController {
    private final RewardService rewardService;

    @GetMapping("/{userType:parent|child}/shop")
    public Result<List<ShopItemDto>> getAllShopItems() {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<ShopItemDto> items = rewardService.getAllShopItems(userType, userId);
        return Result.success(items);
    }


    @PatchMapping("/parent/shop/{shopItemId}")
    public Result<ShopItemDto> updateShopItem(
            @PathVariable Long shopItemId,
            @RequestBody ShopItemUpdateVo shopItemUpdateVo) {
        Long parentId = BaseContext.getCurrentUser().id();
        ShopItemDto updatedItem = rewardService.updateShopItem(shopItemId, shopItemUpdateVo, parentId);
        return Result.success(updatedItem);
    }

    @DeleteMapping("/parent/shop/{shopItemId}")
    public Result<Void> deleteShopItem(@PathVariable Long shopItemId) {
        Long parentId = BaseContext.getCurrentUser().id();
        rewardService.deleteShopItem(shopItemId, parentId);
        return Result.success();
    }

    @PostMapping("/parent/shop")
    public Result<ShopItemDto> createShopItem(@RequestBody ShopItemUpdateVo shopItemUpdateVo) {
        Long parentId = BaseContext.getCurrentUser().id();
        ShopItemDto newItem = rewardService.createShopItem(shopItemUpdateVo, parentId);
        return Result.success(newItem);
    }

    @PostMapping("/child/shop/{shopItemId}")
    public Result<PurchasedItemDto> purchaseShopItem(@PathVariable Long shopItemId) {
        Long childId = BaseContext.getCurrentUser().id();
        PurchasedItemDto purchasedItem = rewardService.purchaseShopItem(shopItemId, childId);
        return Result.success(purchasedItem);
    }

    @GetMapping("/{userType:parent|child}/redeem")
    public Result<List<PurchasedItemDto>> getAllPurchasedItems() {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<PurchasedItemDto> items = rewardService.getAllPurchasedItems(userType, userId);
        return Result.success(items);
    }

    @PatchMapping("/{userType:parent|child}/redeem/{purchasedItemId}")
    public Result<Void> redeemPurchasedItemForParent(@PathVariable Long purchasedItemId) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        rewardService.redeemPurchasedItem(purchasedItemId, userType, userId);
        return Result.success();
    }
}
