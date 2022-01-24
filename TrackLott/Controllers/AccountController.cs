using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrackLott.DTOs;
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

  private async Task<bool> UserExists(string username)
  {
    return await _userManager.Users.AnyAsync(entry => entry.Email.Equals(username.ToLower()));
  }
}