# Agent Rules

1. **Auto-Push to GitHub:** Every time you make a change (even small changes) for the user, you MUST run `git add .`, `git commit -m "<descriptive message>"`, and `git push origin main` before completing the task. 
2. **Protect Credentials:** Never commit real credentials to the repository. If modifying a file with credentials (like `application.properties` or `.env`), ensure it is gitignored and only push a `.example` file.
