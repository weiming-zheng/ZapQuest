package com.splash.zapquest.common.converter;

import com.splash.zapquest.common.enumeration.TaskLabel;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TaskLabelConverter implements AttributeConverter<TaskLabel, String> {
    @Override
    public String convertToDatabaseColumn(TaskLabel taskLabel) {
        return taskLabel != null ? taskLabel.getValue() : null;
    }

    @Override
    public TaskLabel convertToEntityAttribute(String value) {
        return value != null ? TaskLabel.fromValue(value) : null;
    }
}