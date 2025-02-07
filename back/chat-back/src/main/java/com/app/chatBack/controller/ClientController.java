package com.app.chatBack.controller;

import com.app.chatBack.exceptions.ApiException;
import com.app.chatBack.model.dto.ClientDTO;
import com.app.chatBack.model.dto.ResponseDTO;
import com.app.chatBack.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "true")
@RequestMapping("/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping()
    public ResponseEntity<ResponseDTO> saveClient(@RequestBody ClientDTO clientDTO) throws ApiException {
        return ResponseEntity.ok(clientService.saveClient(clientDTO));
    }

    @GetMapping("/chatConsultant/{consultarUserName}")
    public ResponseEntity<?> getChatConsultant(@PathVariable String consultarUserName) throws ApiException {
        return ResponseEntity.ok(clientService.getChatsConsultant(consultarUserName));
    }
}
