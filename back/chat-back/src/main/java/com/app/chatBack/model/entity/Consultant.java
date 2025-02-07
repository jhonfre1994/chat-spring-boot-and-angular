/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author jhonfre
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "consultant")
public class Consultant {

    @Id
    private String id;
    private String userName;
    private String name;
    private String lastName;

}
