package com.splash.zapquest.pojo.entity;

import com.splash.zapquest.common.enumeration.TaskLabel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "preset_task")
public class PresetTask extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String setup;

    @Column(name = "task_procedure", length = 2000)
    private String procedure;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskLabel label;
}