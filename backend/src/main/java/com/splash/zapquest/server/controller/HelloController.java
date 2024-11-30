package com.splash.zapquest.server.controller;

import com.splash.zapquest.common.result.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HelloController {
    @GetMapping("/parent/hello")
    public Result<String> helloParent() {
        log.info("hello parent");
        return Result.success("hello parent");
    }

    @GetMapping("/child/hello")
    public Result<String> helloChild() {
        log.info("hello child");
        return Result.success("hello child");
    }
}
