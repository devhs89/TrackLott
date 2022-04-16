using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.DTOs;
using TrackLott.Entities;
using TrackLott.Extensions;
using TrackLott.Interfaces;
using TrackLott.Services;

namespace TrackLott.Controllers;

public class AccountController : BaseApiController
{
  private readonly UserManager<Member> _userManager;
  private readonly SignInManager<Member> _signInManager;
  private readonly TokenService _tokenService;
  private readonly IMailNoticeService _mailNotice;

  public AccountController(UserManager<Member> userManager, SignInManager<Member> signInManager,
    TokenService tokenService, IMailNoticeService mailNotice)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _tokenService = tokenService;
    _mailNotice = mailNotice;
  }

  [HttpPost("register")]
  public async Task<ActionResult<UserTokenDto>> Register(RegisterDto registerDto)
  {
    if (await CheckEmailTaken(registerDto.Email))
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.DuplicateEmail.ToString(), Description = "Email address is already taken"});

    var user = new Member()
    {
      UserName = registerDto.UserName.ToLower(),
      Email = registerDto.Email.ToLower(),
      GivenName = registerDto.GivenName.ToLower(),
      Surname = registerDto.Surname.ToLower(),
      Dob = DateTime.Parse(registerDto.Dob),
      TermsCheck = registerDto.TermsCheck,
      Country = registerDto.Country.ToLower()
    };

    var result = await _userManager.CreateAsync(user, registerDto.Password);

    if (!result.Succeeded) return BadRequest(result.Errors);

    var roleResult = await _userManager.AddToRoleAsync(user, "Member");

    if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

    await _mailNotice.RegisterNotification(user);

    return new UserTokenDto()
    {
      UserName = user.UserName,
      Token = await _tokenService.CreateToken(user)
    };
  }

  [HttpPost("login")]
  public async Task<ActionResult<UserTokenDto>> Login(LoginDto loginDto)
  {
    var user = await _userManager.Users
      .SingleOrDefaultAsync(rec => rec.UserName.Equals(loginDto.UserName.ToLower()));

    if (user == null)
      return Unauthorized(new ErrorResponseDto()
        {Code = ErrorCodes.LoginMismatch.ToString(), Description = "Invalid email or password"});

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

    await _mailNotice.LoginNotification(user, result.Succeeded);

    if (!result.Succeeded) return Unauthorized();

    return new UserTokenDto()
    {
      UserName = user.UserName,
      Token = await _tokenService.CreateToken(user)
    };
  }

  [HttpPost("show")]
  [Authorize]
  public async Task<ActionResult<AccountDto>> ShowMember()
  {
    var userName = User.GetUserName();

    var member = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(userName));

    if (member == null)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.InvalidUser.ToString(), Description = "User not found"});

    return new AccountDto()
    {
      UserName = member.UserName,
      Email = member.Email,
      GivenName = member.GivenName,
      Surname = member.Surname,
      Dob = member.Dob,
      Country = member.Country
    };
  }

  [HttpPost("updatePassword")]
  [Authorize]
  public async Task<ActionResult<string>> UpdatePassword(PasswordDto passwordDto)
  {
    if (!passwordDto.newPassword.Equals(passwordDto.repeatPassword))
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.PasswordsMismatch.ToString(), Description = "New passwords do not match"});

    var username = User.GetUserName();

    var member = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(username));

    if (member == null)
      return BadRequest(
        new ErrorResponseDto() {Code = ErrorCodes.InvalidUser.ToString(), Description = "No user found"});

    var result =
      await _userManager.ChangePasswordAsync(member, passwordDto.currentPassword, passwordDto.newPassword);

    return result.Succeeded
      ? "Password updated successfully"
      : BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.ChangePasswordFail.ToString(), Description = "Change password failed for user."});
  }

  [HttpPut("updateInfo")]
  [Authorize]
  public async Task<ActionResult<string>> UpdateInfo(AccountUpdateDto accountUpdateDto)
  {
    var userName = User.GetUserName();

    var member = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(userName));

    if (member == null)
      return BadRequest(
        new ErrorResponseDto() {Code = ErrorCodes.InvalidUser.ToString(), Description = "No user found"});

    if (accountUpdateDto.Email != null) member.Email = accountUpdateDto.Email;
    if (accountUpdateDto.GivenName != null) member.GivenName = accountUpdateDto.GivenName;
    if (accountUpdateDto.Surname != null) member.Surname = accountUpdateDto.Surname;
    if (accountUpdateDto.Country != null) member.Country = accountUpdateDto.Country;

    var res = await _userManager.UpdateAsync(member);

    if (res == null)
      return BadRequest(new ErrorResponseDto()
        {Code = ErrorCodes.DefaultError.ToString(), Description = "Something went wrong"});

    if (res.ToString() == "Succeeded") return NoContent();

    return BadRequest(new ErrorResponseDto()
      {Code = ErrorCodes.DefaultError.ToString(), Description = "Something went wrong"});
  }

  private async Task<bool> CheckEmailTaken(string email)
  {
    return await _userManager.Users.AnyAsync(entry => entry.Email.Equals(email.ToLower()));
  }
}