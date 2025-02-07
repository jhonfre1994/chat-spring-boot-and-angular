/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service.impl;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.entity.Consultant;
import com.app.chatBack.repository.ConsultantRepository;
import com.app.chatBack.service.ConsultantService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 * @author jhonfre
 */
@Service
public class ConsultantServiceImpl implements ConsultantService {

    @Autowired
    private ConsultantRepository sessionsRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public Consultant saveSessionUser(Consultant session) throws ApiException {
        Consultant res = new Consultant();
        try {
            sessionsRepository.findByUserName(session.getUserName());
            res = sessionsRepository.save(session);
            messagingTemplate.convertAndSend("/user/queue/users", sessionsRepository.findAll());
        } catch (Exception e) {
            throw new ApiException("Error guardadon el usuario", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
        return res;
    }

    @Override
    public Optional<Consultant> getConsultantByUserName(String consultantUserName) throws ApiException {
        Consultant consultant = sessionsRepository.findByUserName(consultantUserName);
        if (consultant == null) {
            throw new ApiException("Consultant nor found", HttpStatus.NOT_FOUND.value());
        }
        return Optional.of(consultant);
    }

    @Override
    public List<Consultant> getAllConsultants() throws ApiException {
        List<Consultant> consultants = sessionsRepository.findAll();
        if (consultants.isEmpty()) {
            throw new ApiException("No hay usuarios", HttpStatus.NOT_FOUND.value());
        }
        return consultants;
    }

}
