package com.splash.zapquest.common.converter;

import com.splash.zapquest.common.enumeration.TaskStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TaskStatusConverter implements AttributeConverter<TaskStatus, String> {
    @Override
    public String convertToDatabaseColumn(TaskStatus taskStatus) {
        return taskStatus != null ? taskStatus.getValue() : null;
    }

    @Override
    public TaskStatus convertToEntityAttribute(String value) {
        return value != null ? TaskStatus.fromValue(value) : null;
    }
}