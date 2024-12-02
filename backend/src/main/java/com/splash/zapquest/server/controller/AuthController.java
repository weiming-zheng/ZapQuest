package com.splash.zapquest.server.controller;

import com.splash.zapquest.common.result.Result;
import com.splash.zapquest.pojo.dto.ChildAuthDto;
import com.splash.zapquest.pojo.dto.ParentAuthDto;
import com.splash.zapquest.pojo.vo.ChildLoginVo;
import com.splash.zapquest.pojo.vo.ParentLoginVo;
import com.splash.zapquest.pojo.vo.ParentRegisterVo;
import com.splash.zapquest.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/parent/login")
    public Result<ParentAuthDto> loginParent(@RequestBody ParentLoginVo parentLoginVo) throws Exception {
        log.info("Parent login attempt for email: {}", parentLoginVo.getEmail());
        return authService.loginParent(parentLoginVo.getEmail(), parentLoginVo.getPassword());
    }

    @PostMapping("/parent/register")
    public Result<ParentAuthDto> registerParent(@RequestBody ParentRegisterVo parentRegisterVo) throws Exception {
        log.info("Parent registration attempt for email: {}", parentRegisterVo.getEmail());
        return authService.registerParent(parentRegisterVo.getEmail(), parentRegisterVo.getPassword(), parentRegisterVo.getChildName());
    }

    @PostMapping("/child/login")
    public Result<ChildAuthDto> loginChild(@RequestBody ChildLoginVo childLoginVo) {
        log.info("Child login attempt with code: {}", childLoginVo.getLoginCode());
        var res = authService.loginChild(childLoginVo.getLoginCode());
        return res;
    }
}
