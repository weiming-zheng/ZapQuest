package com.splash.zapquest.server.service;

import com.splash.zapquest.common.constant.JwtClaimsConstant;
import com.splash.zapquest.common.exception.UnauthorizedOperationException;
import com.splash.zapquest.pojo.dto.CommentDto;
import com.splash.zapquest.pojo.dto.ThreadDto;
import com.splash.zapquest.pojo.dto.ThreadPreviewDto;
import com.splash.zapquest.pojo.entity.Comment;
import com.splash.zapquest.pojo.entity.Parent;
import com.splash.zapquest.pojo.entity.Thread;
import com.splash.zapquest.pojo.vo.CommentVo;
import com.splash.zapquest.pojo.vo.ThreadVo;
import com.splash.zapquest.server.repo.CommentRepository;
import com.splash.zapquest.server.repo.ParentRepository;
import com.splash.zapquest.server.repo.ThreadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ForumService {
    private final ThreadRepository threadRepository;
    private final CommentRepository commentRepository;
    private final ParentRepository parentRepository;

    private void validateParentAccess(String userType) {
        if (!userType.equals(JwtClaimsConstant.PARENT_ID)) {
            throw new UnauthorizedOperationException("Only parents can access forum features");
        }
    }

    public List<ThreadDto> getAllThreads(String userType, Long userId) {
        validateParentAccess(userType);
        return threadRepository.findAllWithLikersAndComments().stream()
                .map(thread -> convertToThreadDto(thread, userId))
                .collect(Collectors.toList());
    }

    public List<ThreadPreviewDto> getMyThreads(String userType, Long userId) {
        validateParentAccess(userType);
        return threadRepository.findAllByCreatorIdWithLikers(userId).stream()
                .map(thread -> convertToThreadPreviewDto(thread, userId))
                .collect(Collectors.toList());
    }

    public List<ThreadPreviewDto> getSearchedThreads(String keyword, String userType, Long userId) {
        validateParentAccess(userType);
        return threadRepository.findAllByTitleContainingWithLikers(keyword).stream()
                .map(thread -> convertToThreadPreviewDto(thread, userId))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteThread(Long threadId, String userType, Long userId) {
        validateParentAccess(userType);
        Thread thread = threadRepository.findById(threadId)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        if (!thread.getCreator().getId().equals(userId)) {
            throw new UnauthorizedOperationException("You can only delete your own threads");
        }

        thread.setIsDeleted(true);
        threadRepository.save(thread);
    }
    @Transactional
    public Integer setLike(Long threadId, Boolean like, String userType, Long userId) {
        validateParentAccess(userType);
        Thread thread = threadRepository.findByIdWithLikersAndComments(threadId);
//                .(() -> new RuntimeException("Thread not found"));

        Parent parent = parentRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        // Add debugging
//        log.info("Parent ID after fetch: {}", parent.getId());

        if (like) {
            thread.getLikers().add(parent);
        } else {
            thread.getLikers().remove(parent);
        }

        threadRepository.save(thread);
        return thread.getLikers().size();
    }

    @Transactional
    public ThreadDto createThread(ThreadVo threadVo, String userType, Long userId) {
        validateParentAccess(userType);
        Parent parent = parentRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        Thread thread = Thread.builder()
                .title(threadVo.getTitle())
                .content(threadVo.getContent())
                .creator(parent)
                .build();

        Thread savedThread = threadRepository.save(thread);
        return convertToThreadDto(savedThread, userId);
    }

    @Transactional
    public void updateThread(Long threadId, ThreadVo threadVo, String userType, Long userId) {
        validateParentAccess(userType);
        Thread thread = threadRepository.findById(threadId)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        if (!thread.getCreator().getId().equals(userId)) {
            throw new UnauthorizedOperationException("You can only update your own threads");
        }

        thread.setTitle(threadVo.getTitle());
        thread.setContent(threadVo.getContent());
        threadRepository.save(thread);
    }

    @Transactional
    public CommentDto createComment(Long threadId, CommentVo commentVo, String userType, Long userId) {
        validateParentAccess(userType);
        Thread thread = threadRepository.findById(threadId)
                .orElseThrow(() -> new RuntimeException("Thread not found"));

        Parent parent = parentRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));

        Comment comment = Comment.builder()
                .content(commentVo.getContent())
                .creator(parent)
                .thread(thread)
                .build();

        Comment savedComment = commentRepository.save(comment);
        return convertToCommentDto(savedComment);
    }

    private ThreadPreviewDto convertToThreadPreviewDto(Thread thread, Long userId) {
        ThreadPreviewDto dto = new ThreadPreviewDto();
        dto.setId(thread.getId());
        dto.setTitle(thread.getTitle());
        dto.setCreatedAt(thread.getCreatedAt());
        dto.setLike((long) thread.getLikers().size());
        dto.setHasLiked(thread.getLikers().stream()
                .anyMatch(liker -> liker.getId().equals(userId)));
        return dto;
    }

    private ThreadDto convertToThreadDto(Thread thread, Long userId) {
        ThreadDto dto = new ThreadDto();
        dto.setId(thread.getId());
        dto.setTitle(thread.getTitle());
        dto.setContent(thread.getContent());
        dto.setCreatedAt(thread.getCreatedAt());
        dto.setLike((long) thread.getLikers().size());
        dto.setHasLiked(thread.getLikers().stream()
                .anyMatch(liker -> liker.getId().equals(userId)));
        dto.setComments(thread.getComments().stream()
                .map(this::convertToCommentDto)
                .collect(Collectors.toSet()));
        return dto;
    }

    private CommentDto convertToCommentDto(Comment comment) {
        CommentDto dto = new CommentDto();
        BeanUtils.copyProperties(comment, dto);
        return dto;
    }
}