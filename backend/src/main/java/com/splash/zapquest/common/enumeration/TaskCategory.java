package com.splash.zapquest.common.enumeration;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;

public enum TaskCategory {
    NORMAL("normal"),
    PRESET("preset");

    private final String value;

    TaskCategory(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static TaskCategory fromValue(String value) {
        return Arrays.stream(TaskCategory.values())
                .filter(category -> category.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown TaskCategory value: " + value +
                                ". Allowed values are: " + Arrays.toString(TaskCategory.values())
                ));
    }

    @Override
    public String toString() {
        return value;
    }
}