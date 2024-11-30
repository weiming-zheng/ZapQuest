package com.splash.zapquest.server.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NoFaviconController {
    @GetMapping("favicon.ico")
    public void returnNoFavicon() {}
}
