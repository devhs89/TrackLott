# TrackLott
##### Side project - to show my skills in Asp.Net, Entity Framework, C#, Angular & TypeScript

An Angular-Asp.Net web application that lets you track your previously played lottery number combinations and play a lottery game to predict lucky lotto combinations.

---

### Development
1. Set following environment variables -
   1. "ASPNETCORE_ENVIRONMENT" = "Development"
   2. "SQL_DEV_URL" = [Insert Connection String - Install appropriate Entity Framework package if using database other than MySQL]
   3. "TOKEN_KEY" = [Insert strong password here]
2. For Https requests, visit https://docs.microsoft.com/en-us/dotnet/core/additional-tools/self-signed-certificates-guide
3. Create TrackLott/appsettings.json file for any initial settings
4. Setup MySQL database and create database "tracklott"
   1. Install appropriate Nuget package if using any using database other than MySQL
5. Run "dotnet ef database update" to apply any pending changes
6. Build and run application with "dotnet run --build"

---

### Conventional Commits Format
```
<TYPE>:[featureName]: <description>
```
The commit must be prefixed with commit "type" followed by a colon, then feature name followed by a colon ***(in camel case & only if a feature commit)*** & finally the commit description.  

##### Types

The most common types are:

- `FIX:` a commit that fixes a bug.
- `FEATURE:` a commit that adds a feature.
- `DOCS:` a commit that adds or updates comments.
- `TEST:` a commit that adds any test(s).
- `REFACTOR:` a commit that improves performance or readability without any functional changes.
- `MISC:` a commit that does not fall under any of the above types.  

##### Examples

Commit to fix a bug
```
FIX: move "user logged in" check out of RxJS subscription
```

Commit adding a new feature
```
FEATURE:emailService: implement email service
```
