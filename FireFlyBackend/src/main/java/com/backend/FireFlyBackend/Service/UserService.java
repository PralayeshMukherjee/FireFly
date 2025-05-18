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
                    "<html>" +
                            "<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;'>" +
                            "<div style='max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>" +
                            "<div style='text-align: center; margin-bottom: 20px;'>" +
                            "<img src='/images/fireflyLogo.png' alt='Team FireFly Logo' style='height: 60px; margin-bottom: 10px;' />" +
                            "<h1 style='font-size: 26px; color: #333;'>Welcome to Team FireFly, " + username + "!</h1>" +
                            "</div>" +
                            "<p style='font-size: 18px; color: #555;'>We're excited to have you on board. Use the OTP below to complete your verification process:</p>" +
                            "<div style='text-align: center; margin: 20px 0;'>" +
                            "<p style='font-size: 22px; font-weight: bold; color: #1a73e8;'>" + otp + "</p>" +
                            "</div>" +
                            "<p style='font-size: 16px; color: #d93025;'><strong>Security Notice:</strong></p>" +
                            "<ul style='font-size: 14px; color: #555; padding-left: 20px;'>" +
                            "<li>Never share your OTP with anyone, including Team FireFly staff.</li>" +
                            "<li>This OTP is valid for a limited time and can only be used once.</li>" +
                            "<li>If you did not request this OTP, please disregard this email.</li>" +
                            "</ul>" +
                            "<p style='font-size: 14px; color: #999; text-align: center; margin-top: 30px;'>© 2025 Team FireFly. All rights reserved.</p>" +
                            "</div>" +
                            "</body>" +
                            "</html>",
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
