package com.backend.FireFlyBackend.Service;

import com.backend.FireFlyBackend.entity.UserEntity;
import com.backend.FireFlyBackend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
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
    @Autowired
    private JavaMailSender javaMailSender;
    public boolean sendOTPToEmail(String username,String email){
        try{
            String otp = otpMapping.get(email);
            System.out.println(otp);
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true);

            messageHelper.setFrom("rajmukherjeegcp@gmail.com");
            messageHelper.setTo(email);
            messageHelper.setSubject("OTP for our Verification: TEAM LIBRARY");
            messageHelper.setText(
                    "<html><div>" +
                            "<h1 style='font-size:24px;'>Welcome to The Librarian, " + username + "!</h1>" +
                            "<p style='font-size:20px;'>Your OTP is: <strong>" + otp + "</strong></p>" +
                            "<p style='font-size:16px; color:red; display: inline-block;'><strong>Security Notice:</strong></p>" +
                            "<ul style='font-size:14px; color:#555;'>" +
                            "<li>Never share your OTP with anyone, including Librarian staff.</li>" +
                            "<li>The OTP is valid for a limited time and can only be used once.</li>" +
                            "<li>If you did not request this OTP, please ignore this email.</li>" +
                            "</ul>" +
                            "</div></html>",
                    true
            );
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    public boolean verifyOTP(String emailId, String otp){
        if(otpMapping.containsKey(emailId)){
            if(otpMapping.get(emailId).equals(otp)){
                otpMapping.remove(emailId);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    public boolean successRegister(String name,String emailId,String password){
        UserEntity userEntity = new UserEntity();
        userEntity.setEmailId(emailId);
        userEntity.setName(name);
        try{
            userEntity.setPassword(passwordEncoder.encode(password));
            userRepository.save(userEntity);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    public String SuccessfullyLogin(String emailId,String password){
        try{
            Optional<UserEntity> uE = userRepository.findById(emailId);
            UserEntity userEntity = null;
            if(uE.isPresent()){
                userEntity = uE.get();
                String storedHashedPassword = userEntity.getPassword();
                boolean isPasswordMatch = passwordEncoder.matches(password,storedHashedPassword);
                if(isPasswordMatch){
                    return "0";
                }else{
                    return "1";
                }
            }else{
                return "2";
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "-1";
        }
    }
}
