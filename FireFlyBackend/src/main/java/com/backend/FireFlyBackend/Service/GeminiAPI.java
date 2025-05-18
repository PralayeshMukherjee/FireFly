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
        String formattedPrompt = "";
        userMessage = userMessage.trim().toLowerCase();
        if(userMessage.contains("medicine")){
            formattedPrompt = "suggest medicine and give me response in 100-150 words and attached bullet points about the medicines : "+ userMessage+" and don't use 'I am an AI assistant, and cannot provide medical advice.' this line or other any warnings "+" and add a summary of all the things that you mention";
        }else if(userMessage.equalsIgnoreCase("hey") || userMessage.equalsIgnoreCase("hi")){
            return Mono.just(Map.of(
                    "response", "This is your firefly chatbot. How can I help you?"
            ));
        }else if(userMessage.equalsIgnoreCase("thanks") || userMessage.equalsIgnoreCase("thank you")){
            return Mono.just(Map.of(
                    "response", "Mention not. I am here to help you always, good day"
            ));
        }else if(userMessage.contains("symptoms")){
            formattedPrompt = "what is the symptoms of and give me response in 50-60 words paragraph and some bullet points related to medicine or help care related topic on the: "+userMessage+" and don't use 'I am an AI assistant, and cannot provide medical advice.' this line or other any warnings";
        }else if(userMessage.contains("disease")){
            formattedPrompt = "explain and give me response in 50-60 words paragraph and some bullet points related to medicine or help care related topic on the: "+ userMessage+" and don't use 'I am an AI assistant, and cannot provide medical advice.' this line or other any warnings";
        }else{
            formattedPrompt = "give me response in 50-60 words paragraph and some bullet points related to medicine or help care related topic on the: "+userMessage+" and don't use 'I am an AI assistant, and cannot provide medical advice.' this line or other any warnings";
        }
        return webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/models/gemini-2.0-flash:generateContent").queryParam("key", apiKey).build())
                .bodyValue(Map.of(
                        "contents", new Object[]{
                                Map.of("parts", new Object[]{
                                        Map.of("text", formattedPrompt)
                                })
                        }
                ))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(response -> response);
    }
}
