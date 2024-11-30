package com.splash.zapquest.pojo.vo;

import com.splash.zapquest.common.enumeration.TaskStatus;
import lombok.Data;

@Data
public class TaskChangeVo {
    private String name;
    private String setup;
    private String procedure;
    private Integer bonus;
    private TaskStatus status;
    private String label;
}