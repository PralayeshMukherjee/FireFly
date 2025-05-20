package com.backend.FireFlyBackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "userData")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    @ManyToOne
    @JoinColumn(name = "email_id", referencedColumnName = "email_id")
    private String email;

    public UserData() {
    }

    public UserData(Long id, String message, String email) {
        this.id = id;
        this.message = message;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
