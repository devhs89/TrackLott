using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.DTOs;
using TrackLott.Extensions;
using TrackLott.Models;
using TrackLott.Services;

namespace TrackLott.Controllers;

public class AccountController : BaseApiController
{
  private readonly UserManager<Member> _userManager;
  private readonly SignInManager<Member> _signInManager;
  private readonly TokenService _tokenService;

  public AccountController(UserManager<Member> userManager, SignInManager<Member> signInManager,
    TokenService tokenService)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _tokenService = tokenService;
  }

  [HttpPost("register")]
  public async Task<ActionResult<UserTokenDto>> Register(RegisterDto registerDto)
  {
    if (await UserExists(registerDto.Email)) return BadRequest("Email is already associated with another account.");

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

    if (user == null) return Unauthorized("Invalid email or password");

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

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

    if (member == null) return BadRequest("User not found");

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
    if (!passwordDto.newPassword.Equals(passwordDto.repeatPassword)) return BadRequest("New passwords do not match");

    var username = User.GetUserName();

    var member = await _userManager.Users.SingleOrDefaultAsync(rec => rec.UserName.Equals(username));

    if (member == null) return BadRequest("No user found");

    var result = await _userManager.ChangePasswordAsync(member, passwordDto.currentPassword, passwordDto.newPassword);

    return !result.Succeeded ? result.Errors.GetEnumerator().Current.Description : "Password updated successfully";
  }

  private async Task<bool> UserExists(string username)
  {
    return await _userManager.Users.AnyAsync(entry => entry.Email.Equals(username.ToLower()));
  }
}