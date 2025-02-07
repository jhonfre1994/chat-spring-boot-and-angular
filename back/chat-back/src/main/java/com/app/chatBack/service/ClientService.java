package com.app.chatBack.service;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.dto.ClientDTO;
import com.app.chatBack.model.dto.ResponseDTO;

public interface ClientService {

    ResponseDTO saveClient(ClientDTO clientDTO) throws ApiException;

    ResponseDTO getChatsConsultant(String consultarUserName) throws ApiException;
}
