package com.splash.zapquest.server.controller;

import com.splash.zapquest.common.context.BaseContext;
import com.splash.zapquest.common.result.Result;
import com.splash.zapquest.pojo.dto.CommentDto;
import com.splash.zapquest.pojo.dto.ThreadDto;
import com.splash.zapquest.pojo.dto.ThreadPreviewDto;
import com.splash.zapquest.pojo.vo.CommentVo;
import com.splash.zapquest.pojo.vo.ThreadVo;
import com.splash.zapquest.server.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forum/parent")
@RequiredArgsConstructor
public class ForumController {
    private final ForumService forumService;

    @GetMapping("/all-threads")
    public Result<List<ThreadDto>> getAllThreads() {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<ThreadDto> threads = forumService.getAllThreads(userType, userId);
        return Result.success(threads);
    }

    @GetMapping("/my-threads")
    public Result<List<ThreadPreviewDto>> getMyThreads() {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<ThreadPreviewDto> threads = forumService.getMyThreads(userType, userId);
        return Result.success(threads);
    }

    @GetMapping("/search")
    public Result<List<ThreadPreviewDto>> getSearchedThreads(@RequestParam String keyword) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<ThreadPreviewDto> threads = forumService.getSearchedThreads(keyword, userType, userId);
        return Result.success(threads);
    }

    @DeleteMapping("/{threadId}")
    public Result<Void> deleteThread(@PathVariable Long threadId) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        forumService.deleteThread(threadId, userType, userId);
        return Result.success();
    }

    @PostMapping("/{threadId}/like")
    public Result<Integer> setLike(@PathVariable Long threadId, @RequestParam Boolean like) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        Integer likeCount = forumService.setLike(threadId, like, userType, userId);
        return Result.success(likeCount);
    }

    @PostMapping
    public Result<ThreadDto> createThread(@RequestBody ThreadVo threadVo) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        ThreadDto thread = forumService.createThread(threadVo, userType, userId);
        return Result.success(thread);
    }

    @PatchMapping("/{threadId}")
    public Result<Void> updateThread(@PathVariable Long threadId, @RequestBody ThreadVo threadVo) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        forumService.updateThread(threadId, threadVo, userType, userId);
        return Result.success();
    }

    @PostMapping("/{threadId}/comment")
    public Result<CommentDto> createComment(@PathVariable Long threadId, @RequestBody CommentVo commentVo) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        CommentDto comment = forumService.createComment(threadId, commentVo, userType, userId);
        return Result.success(comment);
    }
}