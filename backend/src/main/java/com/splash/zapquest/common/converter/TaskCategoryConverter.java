package com.splash.zapquest.common.converter;

import com.splash.zapquest.common.enumeration.TaskCategory;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TaskCategoryConverter implements AttributeConverter<TaskCategory, String> {
    @Override
    public String convertToDatabaseColumn(TaskCategory taskCategory) {
        return taskCategory != null ? taskCategory.getValue() : null;
    }

    @Override
    public TaskCategory convertToEntityAttribute(String value) {
        return value != null ? TaskCategory.fromValue(value) : null;
    }
}
