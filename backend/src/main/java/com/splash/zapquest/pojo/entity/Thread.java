package com.splash.zapquest.pojo.entity;

import com.splash.zapquest.common.enumeration.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "thread")
public class Thread extends BaseEntity {
//    @Column(nullable = false)
//    private String name;
//
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private Parent creator;

    @Column(length = 1000)
    private String title;

    @Column(length = 5000)
    private String content;

    // Many-to-Many relationship with Parent for likes
    @ManyToMany
    @JoinTable(
            name = "thread_likes",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "parent_id")
    )
    @Builder.Default
    private Set<Parent> likers = new HashSet<>();

    // One-to-Many relationship with Comment
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Comment> comments = new HashSet<>();
}
