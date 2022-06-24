namespace TrackLott.Constants;

public static class ErrorResponse
{
  public const string GenericError = "Something went wrong. Sorry for any inconvenience.";
  public const string TrackLottDbConnFail = "TrackLott Database connection failed.";
  public const string MissingSecurityKeysDir = "Security keys directory path missing.";
  public const string UnableToReadFileContent = "Unable to read file's contents.";
  public const string UnableToWriteToken = "Token Handler Unable to Write Token";
  public const string AccountCreationFailed = "Something went wrong. Failed to create user account.";

  public const string AccountAlreadyExists =
    "Account with the specified email address already exists. Please try again.";

  public const string PasswordsMismatch = "Password and Repeat Password fields must match.";
  public const string UserNotExist = "User does not exist. Please check credentials and try again";
  public const string InvalidLoginDetails = "Invalid email or password";
  public const string UserLockedOut = "Account Locked. Please contact administrator.";
  public const string AddToRoleFailed = "Failed to assign a role to this user.";
  public const string PasswordChangeFailed = "Failed to change password. Please contact administrator.";
  public const string NoLatestLottoResult = "No Latest Lotto Result Found.";
  public const string NoMatchingCombinations = "No matching combinations found.";
  public const string InvalidToken = "Invalid user token. Please contact administrator.";
}