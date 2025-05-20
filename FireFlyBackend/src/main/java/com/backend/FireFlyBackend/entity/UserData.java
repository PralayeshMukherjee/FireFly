package com.backend.FireFlyBackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "userData")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String email;
}
