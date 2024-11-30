package com.splash.zapquest.server.controller;

import com.splash.zapquest.common.context.BaseContext;
import com.splash.zapquest.common.result.Result;
import com.splash.zapquest.pojo.dto.PresetTaskDetailDto;
import com.splash.zapquest.pojo.dto.PresetTaskOverviewDto;
import com.splash.zapquest.pojo.dto.TaskDto;
import com.splash.zapquest.pojo.vo.TaskChangeVo;
import com.splash.zapquest.server.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{userType:parent|child}/tasks")
    public Result<List<TaskDto>> getAllTasks() {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        List<TaskDto> tasks = taskService.getAllTasks(userType, userId);
        return Result.success(tasks);
    }

    @GetMapping("/{userType:parent|child}/preset-tasks")
    public Result<List<PresetTaskOverviewDto>> getPresetTasks() {
        List<PresetTaskOverviewDto> presetTasks = taskService.getPresetTasks();
        return Result.success(presetTasks);
    }

    @GetMapping("/{userType:parent|child}/preset-task/{taskId}")
    public Result<PresetTaskDetailDto> getPresetTask(@PathVariable Long taskId) {
        PresetTaskDetailDto presetTask = taskService.getPresetTask(taskId);
        return Result.success(presetTask);
    }

    @PostMapping("/parent")
    public Result<TaskDto> createTask(@RequestBody TaskChangeVo taskChangeVo) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        TaskDto taskDto = taskService.createTask(taskChangeVo, userType, userId);
        return Result.success(taskDto);
    }

    @DeleteMapping("/parent/{taskId}")
    public Result<Void> deleteTask(@PathVariable Long taskId) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        taskService.deleteTask(taskId, userType, userId);
        return Result.success();
    }

    @PatchMapping("/{userType:parent|child}/{taskId}")
    public Result<Void> updateTask(@PathVariable Long taskId, @RequestBody TaskChangeVo taskChangeVo) {
        String userType = BaseContext.getCurrentUser().type();
        Long userId = BaseContext.getCurrentUser().id();
        taskService.updateTask(taskId, taskChangeVo, userType, userId);
        return Result.success();
    }
}