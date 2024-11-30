package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.Child;
import com.splash.zapquest.pojo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
