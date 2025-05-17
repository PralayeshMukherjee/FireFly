package com.backend.FireFlyBackend.DTO;

public class ChatRequest {
    private String userMessage;

    public ChatRequest() {
    }

    public ChatRequest(String usermessage) {
        this.userMessage = usermessage;
    }

    public String getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }
}
