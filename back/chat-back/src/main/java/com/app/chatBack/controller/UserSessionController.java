/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.controller;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.entity.Consultant;
import com.app.chatBack.service.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author jhonfre
 */
@Controller
@CrossOrigin(origins = "*", allowedHeaders = "true")
@RequestMapping("/consultant")
public class UserSessionController {

    @Autowired
    private ConsultantService sessionService;

    @PostMapping()
    public ResponseEntity<?> saveSession(@RequestBody Consultant session) throws ApiException {
        return ResponseEntity.ok(sessionService.saveSessionUser(session));
    }

    @GetMapping("/{consultantUserName}")
    public ResponseEntity<?> getSessions() throws ApiException {
        return ResponseEntity.ok(sessionService.getAllConsultants());
    }

}
