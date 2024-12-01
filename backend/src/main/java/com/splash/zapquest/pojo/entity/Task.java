package com.splash.zapquest.pojo.entity;

import com.splash.zapquest.common.enumeration.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task")
public class Task extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private Parent creator;

    @Column(nullable = false)
    private Integer bonus = 0;

    @Column(length = 1000)
    private String setup;

    @Column(name = "task_procedure", length = 2000)
    private String procedure;

    @Column
    private String label;

    @Column
    private LocalDateTime finishedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TaskStatus status = TaskStatus.INCOMPLETE;
}