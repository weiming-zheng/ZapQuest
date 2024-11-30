package com.splash.zapquest.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "server.encryption")
@Data
public class LoginCodeProperties {
    private String loginCodeEncryptionKey;
}