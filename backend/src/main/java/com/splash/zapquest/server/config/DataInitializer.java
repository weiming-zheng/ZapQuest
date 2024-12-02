package com.splash.zapquest.server.config;

import com.splash.zapquest.common.enumeration.TaskLabel;
import com.splash.zapquest.common.enumeration.TaskStatus;
import com.splash.zapquest.common.utils.LoginCodeUtil;
import com.splash.zapquest.pojo.entity.*;
import com.splash.zapquest.pojo.entity.Thread;
import com.splash.zapquest.server.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {
    private final PresetTaskRepository presetTaskRepository;
    private final ParentRepository parentRepository;
    private final ChildRepository childRepository;
    private final TaskRepository taskRepository;
    private final ThreadRepository threadRepository;
    private final CommentRepository commentRepository;
    private final ShopItemRepository shopItemRepository;
    private final PurchasedItemRepository purchasedItemRepository;
    private final PasswordEncoder passwordEncoder;
    private final LoginCodeUtil loginCodeUtil;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            if (isDataEmpty()) {
                log.info("Initializing database with sample data");

                // Initialize parents and children
                List<Parent> parents = initializeParentsAndChildren();

                // Initialize preset tasks
                initializePresetTasks();

                // Initialize tasks
                initializeTasks(parents.get(0));

                // Initialize forum content
                initializeForumContent(parents);

                // Initialize shop items
                initializeShopItems(parents.get(0));

                log.info("Sample data initialization completed");
            }
        };
    }

    private boolean isDataEmpty() {
        return parentRepository.count() == 0
                && presetTaskRepository.count() == 0
                && threadRepository.count() == 0;
    }

    private List<Parent> initializeParentsAndChildren() throws Exception {
        log.info("Initializing parents and children");

        // Create first parent and child
        String loginCode1 = loginCodeUtil.generateLoginCode();
        String encryptedCode1 = loginCodeUtil.encrypt(loginCode1);

        Parent parent1 = Parent.builder()
                .email("parent1@example.com")
                .password(passwordEncoder.encode("password123"))
                .build();

        Child child1 = Child.builder()
                .name("Alice")
                .loginCode(encryptedCode1)
                .coinBalance(500)
                .parent(parent1)
                .build();

        parent1.setChild(child1);

        // Create second parent and child
        String loginCode2 = loginCodeUtil.generateLoginCode();
        String encryptedCode2 = loginCodeUtil.encrypt(loginCode2);

        Parent parent2 = Parent.builder()
                .email("parent2@example.com")
                .password(passwordEncoder.encode("password123"))
                .build();

        Child child2 = Child.builder()
                .name("Bob")
                .loginCode(encryptedCode2)
                .coinBalance(300)
                .parent(parent2)
                .build();

        parent2.setChild(child2);

        return parentRepository.saveAll(Arrays.asList(parent1, parent2));
    }

    private void initializePresetTasks() {
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

            PresetTask memoryBoxSwap = PresetTask.builder()
                    .name("Memory Box Swap")
                    .label(TaskLabel.CONTINUOUS_UPDATING)
                    .setup("A box with 5-7 small everyday objects")
                    .procedure("1. Place 5 objects in the box and let the child examine them for 30 seconds\n" +
                            "2. Ask the child to close their eyes\n" +
                            "3. Remove one object and add a new one\n" +
                            "4. Child opens eyes and must:\n" +
                            "   - Identify what object was removed\n" +
                            "   - Identify what new object was added\n" +
                            "5. Repeat this process, gradually increasing speed and number of swapped objects\n" +
                            "6. To increase difficulty, ask them to recall the last 2-3 changes in sequence")
                    .build();

            PresetTask storyChainShuffle = PresetTask.builder()
                    .name("Story Chain Shuffle")
                    .label(TaskLabel.SERIAL_REORDERING)
                    .setup("6-8 simple picture cards showing basic actions/events")
                    .procedure("1. Create a simple story sequence with the cards (e.g., wake up → brush teeth → eat breakfast → go to school)\n" +
                            "2. Let the child view the sequence for 30 seconds\n" +
                            "3. Mix up the cards and ask them to:\n" +
                            "   - Recreate the original order\n" +
                            "   - Create a new logical sequence\n" +
                            "4. Add challenge by:\n" +
                            "   - Including more cards\n" +
                            "   - Asking them to insert new events in the middle\n" +
                            "   - Having them tell the story backwards")
                    .build();

            PresetTask numberColorDance = PresetTask.builder()
                    .name("Number-Color Dance")
                    .label(TaskLabel.CONTINUOUS_UPDATING)
                    .setup("Colored floor spots/papers (red, blue, green, yellow) and number cards 1-5")
                    .procedure("1. Place colored spots in a line\n" +
                            "2. Give simple movement rules:\n" +
                            "   - Red spot = jump\n" +
                            "   - Blue spot = spin\n" +
                            "   - Green spot = clap\n" +
                            "   - Yellow spot = wave\n" +
                            "3. Show number cards to indicate repetitions\n" +
                            "4. Child must:\n" +
                            "   - Remember current color-action pairs\n" +
                            "   - Perform each action the number of times shown\n" +
                            "   - Adapt when you change color-action pairs mid-game\n" +
                            "5. Increase difficulty by:\n" +
                            "   - Changing color-action assignments during play\n" +
                            "   - Adding more colors and actions\n" +
                            "   - Making longer sequences")
                    .build();

            presetTaskRepository.save(pictureWordMatch);
            presetTaskRepository.save(memoryBoxSwap);
            presetTaskRepository.save(storyChainShuffle);
            presetTaskRepository.save(numberColorDance);

            log.info("Preset tasks database initialized");
        }
    }

    private void initializeTasks(Parent parent) {
        log.info("Initializing tasks");

        List<Task> tasks = Arrays.asList(
                Task.builder()
                        .name("Daily Reading Practice")
                        .setup("Pick an age-appropriate book")
                        .procedure("Read for 20 minutes and summarize the story")
                        .bonus(100)
                        .creator(parent)
                        .status(TaskStatus.INCOMPLETE)
                        .label(TaskLabel.DUAL_PROCESSING.getValue())
                        .build(),

                Task.builder()
                        .name("Math Problem Set")
                        .setup("Get math workbook and calculator")
                        .procedure("Complete exercises 1-5 on page 42")
                        .bonus(150)
                        .creator(parent)
                        .status(TaskStatus.COMPLETE)
                        .finishedAt(LocalDateTime.now().minusDays(1))
                        .label(TaskLabel.CONTINUOUS_UPDATING.getValue())
                        .build()
        );

        taskRepository.saveAll(tasks);
    }

    private void initializeForumContent(List<Parent> parents) {
        log.info("Initializing forum content");

        Thread thread1 = Thread.builder()
                .title("Tips for Making Reading Fun")
                .content("What strategies do you use to make reading time enjoyable?")
                .creator(parents.get(0))
                .build();

        Thread thread2 = Thread.builder()
                .title("Best Math Apps for Kids")
                .content("Looking for recommendations for math learning apps")
                .creator(parents.get(1))
                .build();

        threadRepository.saveAll(Arrays.asList(thread1, thread2));

        Comment comment1 = Comment.builder()
                .content("We use a reward chart system that works great!")
                .creator(parents.get(1))
                .thread(thread1)
                .build();

        Comment comment2 = Comment.builder()
                .content("We've had success with Khan Academy Kids")
                .creator(parents.get(0))
                .thread(thread2)
                .build();

        commentRepository.saveAll(Arrays.asList(comment1, comment2));
    }

    private void initializeShopItems(Parent parent) {
        log.info("Initializing shop items");

        List<ShopItem> shopItems = Arrays.asList(
                ShopItem.builder()
                        .name("30 Minutes Extra Play Time")
                        .price(200)
                        .creator(parent)
                        .iconId("🧒")
                        .build(),

                ShopItem.builder()
                        .name("Choose Dinner Menu")
                        .price(300)
                        .creator(parent)
                        .iconId("🥣")
                        .build(),

                ShopItem.builder()
                        .name("Movie Night Pick")
                        .price(400)
                        .creator(parent)
                        .iconId("🎬")
                        .build()
        );

        shopItemRepository.saveAll(shopItems);

        // Create a purchased item for testing
        PurchasedItem purchasedItem = PurchasedItem.builder()
                .name("Ice Cream Trip")
                .price(150)
                .child(parent.getChild())
                .iconId("🍦")
                .isRedeemed(false)
                .build();

        purchasedItemRepository.save(purchasedItem);
    }
}