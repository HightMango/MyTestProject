# System Patterns

## System Architecture
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+) - no frameworks.
- **Backend**: Node.js + Express server.
- **Database**: SQLite (file: server/database.sqlite).
- **Static Assets**: Served from server/uploads/games/.

## Key Technical Decisions
1. **No Frontend Framework**: Using vanilla JS for simplicity and performance.
2. **JWT Authentication**: Stateless auth with JWT tokens stored in cookies.
3. **Role-Based Access**: Three roles - user, moderator, admin.
4. **File Uploads**: multer middleware for handling game file uploads.

## Design Patterns
- **MVC-like**: Routes in server/routes/, models in db.js, views as HTML pages.
- **Middleware**: Authentication and authorization middleware in server/middleware/.
- **DB Wrapper**: Custom run, get, all functions in db.js for database operations.

## Component Relationships
- **Auth Flow**: auth.html → auth.js → server/server.js (register/login routes).
- **Game Submission**: publish.html → publish.js → server/routes/games.js.
- **Moderation**: moderator.html → moderator.js → server/routes/games.js (approve/reject).
- **Game Display**: games.html → games.js → server/routes/games.js (list/games).
- **Game Details**: game-detail.html → game-details.js → server/routes/games.js (get/id).

## Critical Implementation Paths
1. User registration → JWT token → store in cookie → attach to requests.
2. Game upload → multer saves file → DB entry created → moderation needed.
3. Game approval → status updated in DB → game becomes visible on main page.
4. Moderator actions → only moderators/admins can access moderator pages and actions.