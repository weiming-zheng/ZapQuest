package com.splash.zapquest.common.context;

public class BaseContext {

    public record UserInfo(String type, Long id) {}

    public static ThreadLocal<UserInfo> threadLocal = new ThreadLocal<>();

    public static void setCurrentUser(String type, Long id) {
        threadLocal.set(new UserInfo(type, id));
    }

    public static UserInfo getCurrentUser() {
        return threadLocal.get();
    }

    public static void removeCurrentUser() {
        threadLocal.remove();
    }

}