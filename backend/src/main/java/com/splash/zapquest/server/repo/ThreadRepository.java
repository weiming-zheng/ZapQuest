package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
    @Query("SELECT t FROM Thread t LEFT JOIN FETCH t.likers WHERE t.isDeleted = false")
    List<Thread> findAllWithLikers();

    @Query("SELECT t FROM Thread t LEFT JOIN FETCH t.likers WHERE t.creator.id = :creatorId AND t.isDeleted = false")
    List<Thread> findAllByCreatorIdWithLikers(Long creatorId);

    @Query("SELECT t FROM Thread t LEFT JOIN FETCH t.likers " +
            "WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) AND t.isDeleted = false")
    List<Thread> findAllByTitleContainingWithLikers(String keyword);

    @Query("SELECT t FROM Thread t LEFT JOIN FETCH t.likers LEFT JOIN FETCH t.comments " +
            "WHERE t.id = :id")
    Thread findByIdWithLikersAndComments(Long id);
}