/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.app.chatBack.configuration;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;

/**
 *
 * @author jhonfre
 */
public class MyStompSessionHandler extends StompSessionHandlerAdapter {

     private Logger logger = LogManager.getLogger(MyStompSessionHandler.class);
     
    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        logger.info("New session established : " + session.getSessionId());
        session.subscribe("/topic/messages", this);
        logger.info("Subscribed to /topic/users");
        session.send("/app/chat", "hola");
        logger.info("Message sent to websocket server");
    }

}
