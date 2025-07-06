package com.backend.FireFlyBackend.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    @Autowired
    private JavaMailSender javaMailSender;

    public boolean sendMailToContact(String recipient,String name,String email,String message){
        if(recipient.isEmpty()){
            recipient = "rajmukherjeegcp@gmail.com"; // Replace with your email
        }
        System.out.println(recipient);
        System.out.println(email);
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

            messageHelper.setTo(recipient);
            messageHelper.setFrom("rajmukherjeegcp@gmail.com");
            messageHelper.setSubject("New Contact Form Submission");
            messageHelper.setText(
                    "Name: " + name + "\n" +
                            "Email: " + email + "\n" +
                            "Message:\n" + message
            );


            javaMailSender.send(mimeMessage);
            return true;
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
