# TrackLott
##### Side project - to show my skills in Asp.Net, Entity Framework, C#, Angular & TypeScript

An Angular-Asp.Net web application that lets you track your previously played lottery number combinations and play a lottery game to predict lucky lotto combinations.

##### Development
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