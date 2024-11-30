package com.splash.zapquest.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "file.storage")
public class FileStorageProperties {
    private String uploadDir = "uploads"; // Default value
    private String allowedTypes = "image/jpeg,image/png,image/gif"; // Default allowed MIME types
    private long maxFileSize = 5242880L; // Default max file size (5MB)
}
