package com.app.chatBack.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConsultantDTO {

    @JsonProperty("user_name")
    private String userName;
    private String name;
    @JsonProperty("last_name")
    private String lastName;
}
