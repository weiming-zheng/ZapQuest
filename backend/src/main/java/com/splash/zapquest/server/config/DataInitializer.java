package com.splash.zapquest.server.config;

import com.splash.zapquest.common.enumeration.TaskLabel;
import com.splash.zapquest.pojo.entity.PresetTask;
import com.splash.zapquest.server.repo.PresetTaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final PresetTaskRepository presetTaskRepository;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            if (presetTaskRepository.count() == 0) {
                log.info("Initializing preset tasks database");

                PresetTask pictureWordMatch = PresetTask.builder()
                        .name("Picture and Word Match")
                        .label(TaskLabel.DUAL_PROCESSING)
                        .setup("Prepare 5 flashcards. Each card shows a picture of an object (e.g., a cat, a ball, etc.) " +
                                "and a simple word unrelated to the picture (e.g., the word \"tree\" next to the picture of a cat).")
                        .procedure("1. Show a child a series of picture-word pairs (e.g., picture of a cat with the word \"tree\" next to it) for 3-5 seconds each.\n" +
                                "2. After a few pairs, ask them questions requiring them to recall both the word and the picture simultaneously, like:\n" +
                                "- \"What word was shown with the picture of the cat?\"\n" +
                                "- \"What picture was shown with the word 'tree'?\"")
                        .build();

                presetTaskRepository.save(pictureWordMatch);
                log.info("Preset tasks database initialized");
            }
        };
    }
}