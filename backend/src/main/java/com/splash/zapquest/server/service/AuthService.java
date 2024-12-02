package com.splash.zapquest.server.service;

import com.splash.zapquest.common.exception.ChildLoginCodeIncorrectException;
import com.splash.zapquest.common.properties.JwtProperties;
import com.splash.zapquest.common.utils.JwtUtil;
import com.splash.zapquest.common.utils.LoginCodeUtil;
import com.splash.zapquest.pojo.dto.ChildAuthDto;
import com.splash.zapquest.pojo.dto.ParentAuthDto;
import com.splash.zapquest.pojo.entity.Child;
import com.splash.zapquest.server.repo.ChildRepository;
import com.splash.zapquest.server.repo.ParentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import com.splash.zapquest.common.constant.JwtClaimsConstant;
import com.splash.zapquest.common.exception.LoginParentNotExistException;
import com.splash.zapquest.common.exception.ParentLoginPasswordIncorrectException;
import com.splash.zapquest.common.exception.RegisterParentAlreadyExistException;
import com.splash.zapquest.common.result.Result;
import com.splash.zapquest.pojo.entity.Parent;
import com.splash.zapquest.pojo.vo.ParentLoginVo;
import com.splash.zapquest.pojo.vo.ParentRegisterVo;
import com.splash.zapquest.pojo.vo.ChildLoginVo;

import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final JwtProperties jwtProperties;
    private final PasswordEncoder passwordEncoder;
    private final LoginCodeUtil loginCodeUtil;

    private String generateToken(String claimKey, Long userId) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put(claimKey, userId);
        String token = JwtUtil.createJWT(jwtProperties.getSecretKey(), jwtProperties.getAccessExpiration(), claims);
        return token;
    }

    @Transactional
    public Result<ParentAuthDto> registerParent(String email, String password, String childName) throws Exception {
        // Check if email already exists
        if (parentRepository.existsByEmail(email)) {
            throw new RegisterParentAlreadyExistException("Email already registered");
        }

        // Generate login code for child
        String originalLoginCode = loginCodeUtil.generateLoginCode();
        log.info("Child Login Code: {}", originalLoginCode);
        String encryptedLoginCode = loginCodeUtil.encrypt(originalLoginCode);

        // Create new parent
        Parent parent = Parent.builder()
                .email(email)
                .password(passwordEncoder.encode(email))
                .build();

        // Create child with encrypted login code
        Child child = Child.builder()
                .loginCode(encryptedLoginCode)
                .parent(parent)
                .name(childName)
                .build();

        parent.setChild(child);

        // Save parent (child will be saved automatically due to cascade)
        parent = parentRepository.save(parent);

        // Generate JWT token
        String token = generateToken(JwtClaimsConstant.PARENT_ID, parent.getId());

        // Create response DTO
        ParentAuthDto response = new ParentAuthDto();
        response.setToken(token);
        response.setChildLoginCode(originalLoginCode);

        return Result.success(response);

    }

    public Result<ParentAuthDto> loginParent(String email, String password) throws Exception {
        // Find parent by email
        Parent parent = parentRepository.findByEmail(email)
                .orElseThrow(() -> new LoginParentNotExistException("Parent not found"));

        // Verify password
        if (!passwordEncoder.matches(password, parent.getPassword())) {
            throw new ParentLoginPasswordIncorrectException("Incorrect password");
        }

        // Get child's encrypted login code and decrypt it
        Child child = parent.getChild();
        String originalLoginCode = loginCodeUtil.decrypt(child.getLoginCode());

        // Generate JWT token
        String token = generateToken(JwtClaimsConstant.PARENT_ID, parent.getId());

        // Create response DTO
        ParentAuthDto response = new ParentAuthDto();
        response.setToken(token);
        response.setChildLoginCode(originalLoginCode);

        return Result.success(response);
    }

    public Result<ChildAuthDto> loginChild(String loginCode) {
        // Find child by encrypted login code
        Child child = childRepository.findAll().stream()
                .filter(c -> {
                    try {
                        String decryptedCode = loginCodeUtil.decrypt(c.getLoginCode());
                        return decryptedCode.equals(loginCode);
                    } catch (Exception e) {
                        return false;
                    }
                })
                .findFirst()
                .orElseThrow(() -> new ChildLoginCodeIncorrectException("Invalid login code"));

        // Generate JWT token for child
        String token = generateToken(JwtClaimsConstant.CHILD_ID, child.getId());
        ChildAuthDto childAuthDto = new ChildAuthDto();
        childAuthDto.setName(child.getName());
        childAuthDto.setToken(token);
        return Result.success(childAuthDto);
    }
}
