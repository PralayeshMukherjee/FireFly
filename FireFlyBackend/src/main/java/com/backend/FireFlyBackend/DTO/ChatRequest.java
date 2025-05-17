package com.backend.FireFlyBackend.DTO;

public class ChatRequest {
    private String usermessage;

    public ChatRequest() {
    }

    public ChatRequest(String usermessage) {
        this.usermessage = usermessage;
    }

    public String getUsermessage() {
        return usermessage;
    }

    public void setUsermessage(String usermessage) {
        this.usermessage = usermessage;
    }
}
