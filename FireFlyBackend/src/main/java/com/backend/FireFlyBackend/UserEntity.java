package com.backend.FireFlyBackend;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class UserEntity {
    private String username;
    private String emailId;
    private String password;
}
