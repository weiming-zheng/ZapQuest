package com.splash.zapquest.server.config;

import com.splash.zapquest.server.interceptor.JwtTokenChildInterceptor;
import com.splash.zapquest.server.interceptor.JwtTokenParentInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;


/**
 * 配置类，注册web层相关组件
 */
@Configuration
@Slf4j
public class WebMvcConfiguration extends WebMvcConfigurationSupport {


    private JwtTokenParentInterceptor jwtTokenParentInterceptor;
    private JwtTokenChildInterceptor jwtTokenChildInterceptor;

    public WebMvcConfiguration(JwtTokenChildInterceptor jwtTokenChildInterceptor,
                               JwtTokenParentInterceptor jwtTokenParentInterceptor) {
        super();
        this.jwtTokenParentInterceptor = jwtTokenParentInterceptor;
        this.jwtTokenChildInterceptor = jwtTokenChildInterceptor;
    }

    /**
     * 注册自定义拦截器
     *
     * @param registry
     */
    protected void addInterceptors(InterceptorRegistry registry) {
        log.info("JWT interceptor enabled");

        registry.addInterceptor(jwtTokenChildInterceptor)
                .addPathPatterns("/api/v1/**/child/**")
                .excludePathPatterns("/api/v1/auth/child/**");

        registry.addInterceptor(jwtTokenParentInterceptor)
                .addPathPatterns("/api/v1/**/parent/**")
                .excludePathPatterns("/api/v1/auth/parent/**");
    }
}