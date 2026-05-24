# GameLab Project Rules for Cline

## Core
- All tasks must be confirmed by user before execution.
- Always ask for clarification on ambiguous tasks.
- Language: Russian (ответы, комментарии в коде, пояснения).

## Tech Stack
- Backend: Node.js + Express, SQLite (файл server/database.sqlite).
- Frontend: vanilla JS (ES6+), HTML5, CSS3. No React/Vue.
- Authentication: JWT, bcrypt.

## Coding Standards
- Use modern JavaScript (const/let, arrow functions, template literals).
- Preserve existing code style (spacing, naming).
- Add try...catch for all async operations and API calls.
- Write comments in Russian for non-trivial logic.

## Project Structure
- Server entry: server/server.js
- Routes: server/routes/
- Middleware: server/middleware/
- DB wrapper: server/db.js (functions: run, get, all)
- Frontend pages: *.html, corresponding *.js in same folder.

## File Handling
- Game uploads via multer → server/uploads/games/
- Serve static: app.use('/uploads', express.static('uploads'))

## Moderation
- Role field in users table: 'user', 'moderator', 'admin'.
- Moderators can delete forum messages, approve/reject game submissions, delete published games.

## Memory
- Maintain memory bank across sessions (see Memory Bank skill).