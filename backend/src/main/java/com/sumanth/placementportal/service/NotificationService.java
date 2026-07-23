package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Notification;
import com.sumanth.placementportal.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    public Notification createNotification(Long studentId,
                                           String title,
                                           String message){

        Notification notification = new Notification();

        notification.setStudentId(studentId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return repository.save(notification);

    }

    public List<Notification> getNotifications(Long studentId){

        return repository.findByStudentIdOrderByCreatedAtDesc(studentId);

    }

}