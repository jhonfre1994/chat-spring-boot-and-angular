package com.app.chatBack.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class MapperUtils {

    private static ModelMapper mapper = new ModelMapper();

    public static <T> T mapObjectToObject(Object originType, Class<T> destinationType) {
        return mapper.map(originType, destinationType);
    }

}
