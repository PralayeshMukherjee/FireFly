package com.backend.FireFlyBackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class GeminiAPI {
    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public GeminiAPI(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com/v1beta/").build();
    }

    public Mono<Map<String, Object>> chat(String userMessage) {
        final String WARNING_FILTER = " and don't use 'I am an AI assistant, and cannot provide medical advice.' this line or other any warnings";

        userMessage = userMessage.trim().toLowerCase();

        // Handle greetings
        if (userMessage.contains("hey") || userMessage.contains("hi")) {
            return Mono.just(Map.of(
                    "response", "This is your firefly chatbot. How can I help you?"
            ));
        }
        if (userMessage.contains("what is your name?") || userMessage.contains("your name")) {
            return Mono.just(Map.of(
                    "response", "My name is FireFly-I'm your AI Power Health Companion"
            ));
        }

        // Handle thanks
        if (userMessage.contains("thanks") || userMessage.contains("thank you")||userMessage.contains("thank")||userMessage.contains("appreciate it")) {
            return Mono.just(Map.of(
                    "response", "Mention not. I am here to help you always, good day"
            ));
        }
        if(userMessage.contains("who are you")||(userMessage.contains("what is your name"))||(userMessage.contains("what do you do"))||(userMessage.contains("are you a doctor"))||(userMessage.contains("are you a human"))){
            return Mono.just(Map.of(
                    "response", "I'm Firefly, your helpful chatbot. I can assist you with health-related queries!"
                    )
            );
        }

        // Generate prompt based on message content
        String formattedPrompt = createPrompt(userMessage, WARNING_FILTER);

        // Send prompt to Gemini API
        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/gemini-2.0-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .bodyValue(Map.of(
                        "contents", new Object[]{
                                Map.of("parts", new Object[]{
                                        Map.of("text", formattedPrompt)
                                })
                        }
                ))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    private String createPrompt(String userMessage, String warningFilter) {
        if (userMessage.contains("medicine")) {
            return "Suggest medicine available in india and give me a response in 100-150 words and attach bullet points about the medicines: "
                    + userMessage + warningFilter + " and add a summary of all the things you mention";
        } else if (userMessage.contains("symptoms")) {
            return "What are the symptoms of: " + userMessage
                    + "? Give me a response in 50-60 words and some bullet points related to medicine or healthcare topics"
                    + warningFilter;
        } else if (userMessage.contains("disease")) {
            return "Explain: " + userMessage
                    + " in a 50-60 word paragraph with some bullet points related to medicine or healthcare topics"
                    + warningFilter;
        } else {
            return "Give me a 50-60 word paragraph with some bullet points related to medicine or healthcare topics on: "
                    + userMessage + warningFilter;
        }
    }

}
