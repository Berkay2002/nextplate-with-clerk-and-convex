# 🎮 2Cents / Image Arena – Full Application Summary

---

## 🌐 Application Overview

**2Cents** is a fast-paced, real-time multiplayer web game where players react to images by submitting witty, absurd, or clever captions. The game is powered by user-generated content and designed to evolve over time through a growing, globally shared image pool.

---

## 🚀 Core Gameplay Loop

Each game session follows this flow:

### 🏁 Game Start
- All **authenticated players must submit one image** and a title.
- Players can:
  - Upload a **brand new image**, or
  - Reuse an image they previously submitted.
- These player-submitted images form the **image pool** for this game.

### 🎲 Serendipity Image Addition
- One additional image is selected from the **global fallback pool** (called a "serendipity image").
- The **total number of rounds = players + 1**.
  - One round per player-submitted image
  - One bonus round for the serendipity image

---

## 🤀 Round Flow

Each round follows a structured two-phase loop:

### 1. **Reaction Phase (1m30s)**
- One image is displayed.
- Players **submit captions/comments** based on the image.
- Players **vote on other players' captions**.
- At the end of the phase, the **caption with the most votes wins**.
- The image is also scored (see below).

### 2. **[Optional] Submission Phase**
*(Only used for future iterations or expansion – not active in this core loop)*

---

## 🏆 Round Winners

- 🛈 **Caption Winner**: The player whose comment receives the most votes
- 🖼️ **Image Winner (round-level)**: Calculated by:
  ```
  positive_ratio = top_comment_votes / total_votes
  ```
  - Used for display purposes and image performance tracking

---

## 🌍 Global Image Pool & Serendipity Logic

### 📆 Global Image Pool
- All **new uploads** are saved permanently to the global `images` table.
- Every image includes:
  - `id`, `title`, `uploader_id`, `storage_path`, `created_at`
  - `is_serendipity_eligible = true` (if it's a brand new image)

### ♻️ Serendipity Selection (Deterministic Rotation)
To avoid random bias and ensure fair exposure:

- A single global value `serendipity_index` is stored in a `global_state` table.
- When a new game is created:
  - The app selects an image using:
    ```sql
    OFFSET (serendipity_index % total_eligible_images)
    ```
  - The image is added to the game as the final round image.
  - `serendipity_index` is incremented by 1.

This guarantees that **all fallback images will eventually loop**, and some will gain popularity through repeated exposure.

---

## 📊 Global Image Popularity System

As serendipity images are shown repeatedly, the system builds a **global popularity score** for each image:

### Metrics Tracked:
- `usage_count`: How often the image has been shown
- `serendipity_rounds`: How often the image was used as fallback
- `serendipity_wins`: How many rounds the image "won" based on caption votes
- `total_votes`: Aggregate vote count from all its appearances
- `positive_ratio_avg`: Average top-comment ratio per use

### Optional Popularity Score Formula:
```ts
popularityScore = (wins / usage_count) + (avgPositiveRatio * weight)
```

This score determines leaderboard/trending placement and can influence:
- Search ranking
- Recommended images
- Seasonal highlights

---

## 🔐 Authentication & Identity

- **Clerk** handles all auth flows using Google OAuth.
- Every player and every piece of content (image, vote, comment) is tied to a `user_id`.

---

## 📓 Supabase Schema Overview (Core Tables)

### `images`
| Field | Type |
|-------|------|
| id | UUID (PK) |
| title | TEXT |
| storage_path | TEXT |
| uploader_id | UUID (FK to Clerk) |
| created_at | TIMESTAMP |
| is_serendipity_eligible | BOOLEAN |
| usage_count | INT |
| serendipity_wins | INT |
| total_votes | INT |

---

### `global_state`
| Field | Type |
|-------|------|
| id | UUID (singleton row) |
| serendipity_index | INT |

---

### `games`, `game_rounds`, `comments`, `votes`, etc.
Gameplay loop uses round-tracking logic to store:
- Which image was used in which round
- Who commented, what they said, and how many votes it got

---

## 🧪 Future-Proofing & Expansions

- Add real-time leaderboard
- Allow users to browse past serendipity images
- Add game variants with multiple serendipity rounds or themes
- Introduce content tagging & moderation tools

---

## ✅ TL;DR Summary

- Every player must submit (or reuse) one image per game
- Each game gets one bonus "serendipity" image from a rotating global pool
- Round winners are based on caption votes
- Image performance is tracked globally over time
- Global popularity = earned through exposure + player reactions
- No deletions — every image lives in the global archive forever
