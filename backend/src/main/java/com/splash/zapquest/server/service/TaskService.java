package com.splash.zapquest.server.service;

import com.splash.zapquest.common.constant.JwtClaimsConstant;
import com.splash.zapquest.common.enumeration.TaskCategory;
import com.splash.zapquest.common.enumeration.TaskStatus;
import com.splash.zapquest.common.exception.UnauthorizedOperationException;
import com.splash.zapquest.pojo.dto.PresetTaskDetailDto;
import com.splash.zapquest.pojo.dto.PresetTaskOverviewDto;
import com.splash.zapquest.pojo.dto.TaskDto;
import com.splash.zapquest.pojo.entity.Child;
import com.splash.zapquest.pojo.entity.Parent;
import com.splash.zapquest.pojo.entity.PresetTask;
import com.splash.zapquest.pojo.entity.Task;
import com.splash.zapquest.pojo.vo.TaskChangeVo;
import com.splash.zapquest.server.repo.ChildRepository;
import com.splash.zapquest.server.repo.ParentRepository;
import com.splash.zapquest.server.repo.PresetTaskRepository;
import com.splash.zapquest.server.repo.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final PresetTaskRepository presetTaskRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;

    public List<TaskDto> getAllTasks(String userType, Long userId) {
        Long parentId;
        if (userType.equals(JwtClaimsConstant.PARENT_ID)) {
            parentId = userId;
        } else {
            Child child = childRepository.findById(userId)
                    .orElseThrow(() -> new UnauthorizedOperationException("Child not found"));
            parentId = child.getParent().getId();
        }

        return taskRepository.findAll().stream()
                .filter(task -> !task.getIsDeleted() && task.getCreator().getId().equals(parentId))
                .map(this::convertToTaskDto)
                .collect(Collectors.toList());
    }

    public List<PresetTaskOverviewDto> getPresetTasks() {
        return presetTaskRepository.findAll().stream()
                .map(this::convertToPresetTaskOverviewDto)
                .collect(Collectors.toList());
    }

    public PresetTaskDetailDto getPresetTask(Long taskId) {
        PresetTask presetTask = presetTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Preset task not found"));
        return convertToPresetTaskDetailDto(presetTask);
    }

    @Transactional
    public TaskDto createTask(TaskChangeVo taskChangeVo, String userType, Long userId) {
        Parent parent = parentRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedOperationException("Parent not found"));

        Task task = Task.builder()
                .name(taskChangeVo.getName())
                .setup(taskChangeVo.getSetup())
                .procedure(taskChangeVo.getProcedure())
                .bonus(taskChangeVo.getBonus())
                .creator(parent)
                .status(TaskStatus.INCOMPLETE)
                .label(taskChangeVo.getLabel())
                .isDeleted(false)
                .build();

        Task savedTask = taskRepository.save(task);
        return convertToTaskDto(savedTask);
    }

    @Transactional
    public void deleteTask(Long taskId, String userType, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreator().getId().equals(userId)) {
            throw new UnauthorizedOperationException("You can only delete your own tasks");
        }

        task.setIsDeleted(true);
        taskRepository.save(task);
    }

    @Transactional
    public void updateTask(Long taskId, TaskChangeVo taskChangeVo, String userType, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreator().getId().equals(userId)) {
            throw new UnauthorizedOperationException("You can only update your own tasks");
        }


        if (userType.equals(JwtClaimsConstant.CHILD_ID)) {
            if (taskChangeVo.getStatus() != null) {
                if (taskChangeVo.getStatus() == TaskStatus.COMPLETE) {
                    Child child = task.getCreator().getChild();
                    child.setCoinBalance(child.getCoinBalance() + taskChangeVo.getBonus());
                    childRepository.save(child);
                    task.setFinishedAt(LocalDateTime.now());
                }
                task.setStatus(taskChangeVo.getStatus());
            }
        } else if (userType.equals(JwtClaimsConstant.PARENT_ID)) {
            updateTaskFields(task, taskChangeVo);
        }

        taskRepository.save(task);
    }

    private void updateTaskFields(Task task, TaskChangeVo taskChangeVo) {
        if (taskChangeVo.getName() != null) {
            task.setName(taskChangeVo.getName());
        }
        if (taskChangeVo.getSetup() != null) {
            task.setSetup(taskChangeVo.getSetup());
        }
        if (taskChangeVo.getProcedure() != null) {
            task.setProcedure(taskChangeVo.getProcedure());
        }
        if (taskChangeVo.getBonus() != null) {
            task.setBonus(taskChangeVo.getBonus());
        }
        if (taskChangeVo.getLabel() != null) {
            task.setLabel(taskChangeVo.getLabel());
        }
    }

    private TaskDto convertToTaskDto(Task task) {
        TaskDto dto = new TaskDto();
        BeanUtils.copyProperties(task, dto);
        return dto;
    }

    private PresetTaskOverviewDto convertToPresetTaskOverviewDto(PresetTask presetTask) {
        PresetTaskOverviewDto dto = new PresetTaskOverviewDto();
        BeanUtils.copyProperties(presetTask, dto);
        dto.setLabel(presetTask.getLabel().getValue());
        return dto;
    }

    private PresetTaskDetailDto convertToPresetTaskDetailDto(PresetTask presetTask) {
        PresetTaskDetailDto dto = new PresetTaskDetailDto();
        BeanUtils.copyProperties(presetTask, dto);
        dto.setLabel(presetTask.getLabel().getValue());
        return dto;
    }
}
