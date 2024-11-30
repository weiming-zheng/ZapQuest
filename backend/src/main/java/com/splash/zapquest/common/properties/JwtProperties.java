package com.splash.zapquest.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "server.jwt")
@Data
public class JwtProperties {
    private String secretKey;
    private long accessExpiration;
    private final String tokenHeaderKey = "Authorization";
}
