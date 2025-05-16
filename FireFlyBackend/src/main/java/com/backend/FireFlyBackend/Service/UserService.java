package com.backend.FireFlyBackend.Service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {
    private static final int otpLenght = 6;
    private Map<String,String > otpMapping = new HashMap<>();
    public boolean generateOTP(String emailId){
        String generatedOTP = "";
        for(int i=1;i<=otpLenght;i++){
            generatedOTP += String.valueOf((int)(Math.random()*9)+1);
        }
        otpMapping.put(emailId,generatedOTP);
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.schedule(()->otpMapping.remove(emailId),2, TimeUnit.MINUTES);
//       the ScheduledExecutorService is a java utility that used to schedule the task. It basically schedule any task execute after a define time stamp you can decide the time stamp here I decide minutes. It is better than Treade.sleep() method because it doesnot block the main tread. Executors.newScheduledThreadPool(1) means it create a thread pool with 1 background thread to handle the schedule task.
        return true;
    }
}
