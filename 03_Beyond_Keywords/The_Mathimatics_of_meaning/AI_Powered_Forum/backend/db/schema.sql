CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CHECK (`email` = LOWER(`email`)),
    INDEX `idx_users_email` (`email`)
);



-- Questions table schema
CREATE TABLE `questions` (
    `question_id` INT AUTO_INCREMENT PRIMARY KEY,
    `question_hash` CHAR(16) NOT NULL UNIQUE,
    `user_id` INT NOT NULL,

    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    -- Constraints
    CHECK (CHAR_LENGTH(`title`) > 5),
    CHECK (CHAR_LENGTH(`content`) > 10),

    -- Foreign Key
    CONSTRAINT `fk_questions_user`
        FOREIGN KEY (`user_id`) 
        REFERENCES `users`(`user_id`) 
        ON DELETE CASCADE,

    -- Indexes
    INDEX `idx_questions_user_id` (`user_id`),
    INDEX `idx_questions_created_at` (`created_at`),

    -- Full-text search index (for searching title + content)
    FULLTEXT KEY `ft_questions_search` (`title`, `content`)
);


-- Answers table schema
CREATE TABLE `answers` (
    `answer_id` INT AUTO_INCREMENT PRIMARY KEY,

    `question_id` INT NOT NULL,
    `user_id` INT NOT NULL,

    `content` TEXT NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    -- Constraints
    CHECK (CHAR_LENGTH(`content`) > 10),

    -- Foreign Keys
        FOREIGN KEY (`question_id`)
        REFERENCES `questions`(`question_id`)
        ON DELETE CASCADE,

        FOREIGN KEY (`user_id`)
        REFERENCES `users`(`user_id`)
        ON DELETE CASCADE,

    -- Indexes
    INDEX `idx_answers_question_id` (`question_id`),
    INDEX `idx_answers_user_id` (`user_id`),
    INDEX `idx_answers_created_at` (`created_at`),

    -- Full-text search
    FULLTEXT KEY `ft_answers_search` (`content`)
);