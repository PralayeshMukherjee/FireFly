package com.backend.FireFlyBackend.DTO;

public class AddUser {
    private String name;
    private String emailId;
    private String password;

    public AddUser() {
    }

    public AddUser(String name, String emailId, String password) {
        this.name = name;
        this.emailId = emailId;
        this.password = password;
    }
}
