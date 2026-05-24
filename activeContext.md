# Active Context

## Current Work Focus
- Initializing the memory bank for the GameLab project.
- Setting up core documentation files to maintain project state across sessions.

## Recent Changes
- Created projectbrief.md outlining the project overview, core requirements, scope, success metrics, and future enhancements.
- Created productContext.md detailing the purpose, problems solved, how it should work, and user experience goals.

## Next Steps
- Create activeContext.md (current file).
- Create systemPatterns.md to document system architecture and technical decisions.
- Create techContext.md to list technologies, development setup, constraints, dependencies, and tool usage.
- Create progress.md to track what works, what's left, current status, known issues, and evolution of decisions.

## Active Decisions and Considerations
- Using vanilla JS for frontend as per project rules.
- Backend with Node.js, Express, and SQLite.
- Authentication via JWT and bcrypt.
- Moderation roles: user, moderator, admin.

## Important Patterns and Preferences
- File organization: server/ for backend, root for frontend assets.
- Static serving of uploaded games via /uploads.
- Multi-language support (i18n) implemented.

## Learnings and Project Insights
- The project already has a basic structure with HTML/CSS/JS files and a server directory.
- There is a memory-bank.md file that explains the memory bank concept, which we are now implementing.