package com.splash.zapquest.common.utils;

import com.splash.zapquest.common.properties.LoginCodeProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class LoginCodeUtil {
    private static final String ALGORITHM = "AES";
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int LOGIN_CODE_LENGTH = 10;

    private SecretKeySpec secretKey;

    public LoginCodeUtil(LoginCodeProperties loginCodeProperties) {
        // Ensure the key is 16 bytes for AES-128
        byte[] key = new byte[16];
        byte[] keyBytes = loginCodeProperties.getLoginCodeEncryptionKey().getBytes();
        System.arraycopy(keyBytes, 0, key, 0, Math.min(keyBytes.length, 16));
        this.secretKey = new SecretKeySpec(key, ALGORITHM);
    }

    public String generateLoginCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(LOGIN_CODE_LENGTH);
        for (int i = 0; i < LOGIN_CODE_LENGTH; i++) {
            sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return sb.toString();
    }

    public String encrypt(String loginCode) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedBytes = cipher.doFinal(loginCode.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public String decrypt(String encryptedLoginCode) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedLoginCode));
        return new String(decryptedBytes);
    }
}