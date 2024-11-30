package com.splash.zapquest.common.enumeration;

import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;

public enum TaskLabel {
    DUAL_PROCESSING("Dual-Processing"),
    CONTINUOUS_UPDATING("Continuous Updating"),
    SERIAL_REORDERING("Serial Reordering");

    private final String value;

    TaskLabel(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public static TaskLabel fromValue(String value) {
        return Arrays.stream(TaskLabel.values())
                .filter(label -> label.getValue().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown TaskLabel value: " + value +
                                ". Allowed values are: " + Arrays.toString(TaskLabel.values())
                ));
    }

    @Override
    public String toString() {
        return value;
    }
}