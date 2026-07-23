package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Notification;
import com.sumanth.placementportal.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins="http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{studentId}")
    public List<Notification> getNotifications(
            @PathVariable Long studentId){

        return notificationService.getNotifications(studentId);

    }

}