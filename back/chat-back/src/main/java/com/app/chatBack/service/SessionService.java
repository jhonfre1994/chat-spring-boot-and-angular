/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service;

import com.app.chatBack.exception.ResourceNotFoundException;
import com.app.chatBack.model.UserSession;
import com.app.chatBack.model.UserStatus;
import com.app.chatBack.repository.SessionsRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 *
 * @author jhonfre
 */
@Service
public class SessionService {

    @Autowired
    private SessionsRepository sessionsRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private MongoOperations mongoOperations;

    public UserSession saveSessionUser(UserSession session) {
        UserSession res = new UserSession();
        try {
            if (sessionsRepository.findByUserName(session.getUserName()) == null) {
                res = sessionsRepository.save(session);
            } else {
                updateStatus(session.getUserName(), UserStatus.ONLINE);
            }
            messagingTemplate.convertAndSend("/user/queue/users", sessionsRepository.findAll());
        } catch (Exception e) {
            throw new ResourceNotFoundException("error");
        }
        return res;
    }

    public List<UserSession> getUsersSession() {
        return sessionsRepository.findAll() != null ? sessionsRepository.findAll() : new ArrayList<>();
    }

    public void updateStatus(String unsername, String status) {
        try {
            Query query = new Query(
                    Criteria
                            .where("userName").is(unsername));
            Update update = Update.update("status", status);
            mongoOperations.updateFirst(query, update, UserSession.class);
            messagingTemplate.convertAndSend("/user/queue/users", sessionsRepository.findAll());
        } catch (Exception e) {
            throw new ResourceNotFoundException("error");
        }
    }

}
