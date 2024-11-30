package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
}
