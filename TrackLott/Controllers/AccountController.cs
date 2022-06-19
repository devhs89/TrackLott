using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Extensions;
using TrackLott.Models.DataModels;
using TrackLott.Models.DTOs;
using TrackLott.Services;

namespace TrackLott.Controllers;

public class AccountController : BaseApiController
{
  private readonly UserManager<UserModel> _userManager;
  private readonly SignInManager<UserModel> _signInManager;
  private readonly TokenService _tokenService;

  public AccountController(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager,
    TokenService tokenService)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _tokenService = tokenService;
  }

  [HttpPost("register")]
  public async Task<ActionResult<UserTokenDto>> Register(RegisterDto registerDto)
  {
    var appUser =
      await _userManager.Users.SingleOrDefaultAsync(usr => usr.NormalizedEmail.Equals(registerDto.Email.Normalize()));

    if (appUser != null)
    {
      return BadRequest(new ErrorResponseDto()
      {
        Code = "500",
        Description = "Email associated with an account already. Please enter a different email address."
      });
    }

    if (!registerDto.Password.Equals(registerDto.RepeatPassword))
    {
      return BadRequest(new ErrorResponseDto()
      {
        Code = ErrorCodes.PasswordsMismatch.ToString(),
        Description = "Password and Repeat Password fields do not match."
      });
    }

    var user = new UserModel()
    {
      UserName = registerDto.Email.ToLower(),
      Email = registerDto.Email.ToLower(),
      GivenName = registerDto.GivenName.ToLower(),
      Surname = registerDto.Surname.ToLower(),
      Dob = DateOnly.FromDateTime(DateTime.Parse(registerDto.Dob)),
      TermsCheck = registerDto.TermsCheck,
      Country = registerDto.Country.ToLower()
    };

    var result = await _userManager.CreateAsync(user, registerDto.Password);

    if (!result.Succeeded) return BadRequest(result.Errors);

    var roleResult = await _userManager.AddToRoleAsync(user, "User");

    if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

    return new UserTokenDto()
    {
      Email = user.NormalizedEmail,
      Token = await _tokenService.CreateToken(user)
    };
  }

  [HttpPost("login")]
  public async Task<ActionResult<UserTokenDto>> Login(LoginDto loginDto)
  {
    var user = await _userManager.Users
      .SingleOrDefaultAsync(rec => rec.NormalizedEmail.Equals(loginDto.Email.Normalize()));

    if (user == null)
      return Unauthorized(new ErrorResponseDto()
        { Code = ErrorCodes.LoginMismatch.ToString(), Description = "Invalid email or password" });

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);

    if (!result.Succeeded) return Unauthorized();

    return new UserTokenDto()
    {
      Email = user.NormalizedEmail,
      Token = await _tokenService.CreateToken(user)
    };
  }

  [HttpPost("show")]
  [Authorize]
  public async Task<ActionResult<ProfileDto>> ShowUser()
  {
    var userName = User.GetUserName();

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(userName));

    if (appUser == null)
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found" });

    return new ProfileDto()
    {
      UserName = appUser.UserName,
      Email = appUser.Email,
      GivenName = appUser.GivenName,
      Surname = appUser.Surname,
      Dob = appUser.Dob.ToString(),
      Country = appUser.Country
    };
  }

  [HttpPost("updatePassword")]
  [Authorize]
  public async Task<ActionResult<string>> UpdatePassword(PasswordDto passwordDto)
  {
    if (!passwordDto.newPassword.Equals(passwordDto.repeatPassword))
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.PasswordsMismatch.ToString(), Description = "New passwords do not match" });

    var username = User.GetUserName();

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(username));

    if (appUser == null)
      return BadRequest(
        new ErrorResponseDto() { Code = ErrorCodes.InvalidUser.ToString(), Description = "No user found" });

    var result =
      await _userManager.ChangePasswordAsync(appUser, passwordDto.currentPassword, passwordDto.newPassword);

    return result.Succeeded
      ? "Password updated successfully"
      : BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.ChangePasswordFail.ToString(), Description = "Change password failed for user." });
  }

  [HttpPut("updateInfo")]
  [Authorize]
  public async Task<ActionResult<string>> UpdateInfo(AccountUpdateDto accountUpdateDto)
  {
    var userName = User.GetUserName();

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(userName));

    if (appUser == null)
      return BadRequest(
        new ErrorResponseDto() { Code = ErrorCodes.InvalidUser.ToString(), Description = "No user found" });

    if (accountUpdateDto.Email != null) appUser.Email = accountUpdateDto.Email;
    if (accountUpdateDto.GivenName != null) appUser.GivenName = accountUpdateDto.GivenName;
    if (accountUpdateDto.Surname != null) appUser.Surname = accountUpdateDto.Surname;
    if (accountUpdateDto.Country != null) appUser.Country = accountUpdateDto.Country;

    var res = await _userManager.UpdateAsync(appUser);

    if (res == null)
      return BadRequest(new ErrorResponseDto()
        { Code = ErrorCodes.DefaultError.ToString(), Description = "Something went wrong" });

    if (res.Succeeded) return NoContent();

    return BadRequest(new ErrorResponseDto()
      { Code = ErrorCodes.DefaultError.ToString(), Description = "Something went wrong" });
  }
}