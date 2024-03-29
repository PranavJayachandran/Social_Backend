# Database Schema Documentation

This README provides an overview of the schema for tables in our database.

## Table 1: `comments`

**Description:** The `comments` table stores information about the comments posted.

**Schema:**

| Column Name | Data Type   | Description                |
|-------------|-------------|----------------------------|
| `id`   | INT         | Unique comment identifier      |
| `inserted_at`  | timestampz | Table inserted_at        |
| `updated_at`     | timestampz| Table update_at       |
| `comment_content`  | text | The comment       |
| `upvote`| int   | number of upvotes  |
| `downvote`|  int  | number of downvotes |
| `user_id`|  text  | Foreign key to users table |
| `post_id`|  int  | Foreign key to posts table |


