/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service;

import com.app.chatBack.model.UserSession;
import java.util.List;

/**
 *
 * @author jhonfre
 */
public interface SessionService {
    
    UserSession saveSessionUser(UserSession session);
    
    List<UserSession> getUsersSession();
    
    void updateStatus(String unsername, String status);
}
