package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Notification;
import com.sumanth.placementportal.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Long studentId, String message) {
        throw new UnsupportedOperationException("Phase 5 refactoring");
    }

    public List<Notification> getNotificationsForStudent(Long studentId) {
        throw new UnsupportedOperationException("Phase 5 refactoring");
    }

    public void markAsRead(Long id) {
        throw new UnsupportedOperationException("Phase 5 refactoring");
    }
}