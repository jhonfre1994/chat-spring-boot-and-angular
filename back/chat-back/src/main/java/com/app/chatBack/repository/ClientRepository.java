package com.app.chatBack.repository;


import com.app.chatBack.model.entity.Client;
import com.app.chatBack.model.entity.Consultant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ClientRepository extends MongoRepository<Client, String> {

    List<Client> findByConsultantId(Consultant consultantId);
}
