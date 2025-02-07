/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.service;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.entity.Consultant;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author jhonfre
 */
public interface ConsultantService {
    
    Consultant saveSessionUser(Consultant session) throws ApiException;
    
    List<Consultant> getAllConsultants() throws ApiException;

    Optional<Consultant> getConsultantByUserName(String consultantUserName) throws ApiException;
}
