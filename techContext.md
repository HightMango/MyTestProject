# Tech Context

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: SQLite (file-based, no server required)
- **Frontend**: HTML5, CSS3, vanilla JavaScript (ES6+)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **File Upload**: multer middleware
- **Deployment**: Node.js server (server/server.js entry point)

## Development Setup
- **Entry Point**: server/server.js
- **Routes**: server/routes/ directory
- **Middleware**: server/middleware/ directory
- **Database**: server/db.js (custom wrapper with run, get, all functions)
- **Static Files**: Frontend HTML/CSS/JS in root, uploads in server/uploads/

## Technical Constraints
- No React, Vue, or other frontend frameworks (vanilla JS only).
- SQLite database file: server/database.sqlite
- JWT tokens stored in HTTP-only cookies.
- File uploads limited to server/uploads/games/ directory.
- Role-based access control: user, moderator, admin.

## Dependencies
- **disallowed-word-filter**: ^1.0.2 (for filtering inappropriate content)
- **express**: web framework
- **sqlite3**: database driver
- **jsonwebtoken**: JWT handling
- **bcrypt**: password hashing
- **multer**: file upload handling

## Tool Usage Patterns
- **Git**: Version control (remote: https://github.com/HightMango/MyTestProject.git)
- **npm**: Package management
- **Node.js**: Runtime environment