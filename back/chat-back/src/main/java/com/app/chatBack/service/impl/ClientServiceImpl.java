package com.app.chatBack.service.impl;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.dto.ClientDTO;
import com.app.chatBack.model.dto.ResponseDTO;
import com.app.chatBack.model.entity.Client;
import com.app.chatBack.model.entity.Consultant;
import com.app.chatBack.repository.ClientRepository;
import com.app.chatBack.service.ChatRoomService;
import com.app.chatBack.service.ClientService;
import com.app.chatBack.service.ConsultantService;
import com.app.chatBack.utils.MapperUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    private final ConsultantService consultantService;

    private final ChatRoomService chatRoomService;

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository,
                             ConsultantService consultantService,
                             ChatRoomService chatRoomService,
                             SimpMessagingTemplate messagingTemplate) {
        this.clientRepository = clientRepository;
        this.consultantService = consultantService;
        this.chatRoomService = chatRoomService;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public ResponseDTO saveClient(ClientDTO clientDTO) throws ApiException {
        try {
            List<Consultant> consultants = consultantService.getAllConsultants();
            int rnd = new Random().nextInt(consultants.size());
            Consultant consultant = consultants.get(rnd);
            Client client = MapperUtils.mapObjectToObject(clientDTO, Client.class);
            client.setConsultantId(consultant);
            Optional<String> chatId = chatRoomService.getChatId(consultant.getUserName(), client.getPhone());
            chatId.ifPresent(client::setChatId);
            client = clientRepository.save(client);
            log.info("/" + consultant.getUserName() + "/user/queue/users");
            messagingTemplate.convertAndSendToUser(consultant.getUserName(), "/user/queue/users", client);
            return ResponseDTO.builder()
                    .message("Client created successfully")
                    .build();
        }catch (Exception e){
            log.error("Error save client", e);
            throw new ApiException("Error save client", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @Override
    public ResponseDTO getChatsConsultant(String consultarUserName) throws ApiException {
        Optional<Consultant> consultant = consultantService.getConsultantByUserName(consultarUserName);
        if (consultant.isPresent()) {
            List<Client> clients = clientRepository.findByConsultantId(consultant.get());
            return ResponseDTO.builder()
                    .data(clients)
                    .message("Clients found")
                    .build();
        }
        return ResponseDTO.builder()
                .message("Consultant not found")
                .build();
    }
}
