package com.splash.zapquest.server.repo;

import com.splash.zapquest.pojo.entity.PresetTask;
import com.splash.zapquest.pojo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PresetTaskRepository extends JpaRepository<PresetTask, Long> {
}
