/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.repository;

import com.app.chatBack.model.entity.Consultant;
import org.springframework.data.mongodb.repository.MongoRepository;
/**
 *
 * @author jhonfre
 */
public interface ConsultantRepository extends MongoRepository<Consultant, String>{
    
    Consultant findByUserName(String userName);
    
}
