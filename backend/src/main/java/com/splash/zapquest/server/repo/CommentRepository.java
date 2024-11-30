package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
