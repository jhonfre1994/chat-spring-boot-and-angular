/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.controller;

import com.app.chatBack.model.UserSession;
import com.app.chatBack.service.SessionService;
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
@RequestMapping("/api/v.1/sessions")
public class UserSessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping()
    public ResponseEntity<?> saveSession(@RequestBody UserSession session) {
        return ResponseEntity.ok(sessionService.saveSessionUser(session));
    }

    @GetMapping()
    public ResponseEntity<?> getSessions() {
        return ResponseEntity.ok(sessionService.getUsersSession());
    }

    @PutMapping("/{username}/{status}")
    public ResponseEntity<?>  updateStatus(@PathVariable("username") String username, @PathVariable("status") String status) {
        sessionService.updateStatus(username, status);
        return ResponseEntity.ok("Cambio de estado correcto");
    }

}
