package com.exam.devsecops.devsecops.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private boolean completed;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
