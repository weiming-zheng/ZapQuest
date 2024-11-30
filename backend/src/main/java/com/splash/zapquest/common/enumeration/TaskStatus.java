package com.splash.zapquest.common.enumeration;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;

public enum TaskStatus {
    COMPLETE("complete"),
    INCOMPLETE("incomplete");

    private final String value;

    TaskStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static TaskStatus fromValue(String value) {
        return Arrays.stream(TaskStatus.values())
                .filter(status -> status.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown TaskStatus value: " + value +
                                ". Allowed values are: " + Arrays.toString(TaskStatus.values())
                ));
    }

    @Override
    public String toString() {
        return value;
    }
}