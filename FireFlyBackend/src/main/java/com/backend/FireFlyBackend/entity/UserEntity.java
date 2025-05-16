package com.backend.FireFlyBackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserDB")
public class UserEntity {
    @Id
    private String emailId;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;

    public UserEntity() {
    }

    public UserEntity(String name, String emailId, String password) {
        this.name = name;
        this.emailId = emailId;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
