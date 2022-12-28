namespace TrackLott.Constants;

public static class MessageResp
{
  public const string GenericError = "Something went wrong. Please contact site administrator.";
  public const string TrackLottDbConnFail = "TrackLott Database connection failed.";
  public const string MissingJwtEncryptionKeysDir = "JWT Encryption keys directory path missing.";
  public const string UnableToReadFileContent = "Unable to read file's contents.";
  public const string UnableToWriteToken = "Token Handler Unable to Write Token";
  public const string AccountCreationFailed = "Something went wrong. Failed to create user account.";

  public const string AccountAlreadyExists =
    "Account with the specified email address already exists. Please try again.";

  public const string PasswordsMismatch = "Password and Repeat Password fields must match.";
  public const string UserNotExist = "User does not exist. Please check credentials and try again";
  public const string InvalidLoginDetails = "Invalid email or password";
  public const string UserLockedOut = "Account Locked. Please contact site administrator.";
  public const string AddToRoleFailed = "Failed to assign a role to this user. Please contact site administrator.";
  public const string PasswordChangeFailed = "Failed to change password. Please contact site administrator.";
  public const string NoLatestLottoResult = "No Latest Lotto Result Found.";
  public const string NoMatchingCombinations = "No matching combinations found.";
  public const string InvalidToken = "Invalid user token. Please contact site administrator.";
  public const string PasswordUpdated = "Password updated successfully";
  public const string ComboSaved = "Combination Saved.";
  public const string ComboSavedWithNoName = "Combinations saved without lottery name.";
  public const string EmailConfirmed = "Email Confirmed.";
  public const string SendGridServiceApiNotSet = "SendGrid Email Service API Key not set";
}