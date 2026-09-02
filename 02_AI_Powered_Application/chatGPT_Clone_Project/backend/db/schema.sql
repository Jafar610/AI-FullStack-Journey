CREATE TABLE `conversations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('user','assistant') NOT NULL,
  `content` text NOT NULL,
  `token_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
)