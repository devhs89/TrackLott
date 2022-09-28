using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using TrackLott.Constants;
using TrackLott.Interfaces;
using TrackLott.Models.DataModels;
using TrackLott.Models.DTOs;

namespace TrackLott.Controllers;

public class AccountController : BaseApiController
{
  private readonly UserManager<TrackLottUserModel> _userManager;
  private readonly SignInManager<TrackLottUserModel> _signInManager;
  private readonly ITokenService _tokenService;
  private readonly IMapper _mapper;
  private readonly IJwtClaimsService _jwtClaimsService;
  private readonly IEmailService _emailService;

  public AccountController(UserManager<TrackLottUserModel> userManager, SignInManager<TrackLottUserModel> signInManager,
    ITokenService tokenService, IMapper mapper, IJwtClaimsService jwtClaimsService, IEmailService emailService)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _tokenService = tokenService;
    _mapper = mapper;
    _jwtClaimsService = jwtClaimsService;
    _emailService = emailService;
  }

  // REGISTER ACCOUNT CONTROLLER ACTION
  [HttpPost(EndRoute.Register), AllowAnonymous]
  public async Task<ActionResult<string>> Register(RegisterDto registerDto)
  {
    // Check if passwords match
    if (!registerDto.Password.Equals(registerDto.RepeatPassword, StringComparison.Ordinal))
      return BadRequest(MessageResp.PasswordsMismatch);

    // Check if user already exists
    var userExists = await _userManager.Users.SingleOrDefaultAsync(usr =>
      usr.NormalizedEmail.Equals(registerDto.Email.Normalize().ToUpper()));
    if (userExists != null) return BadRequest(MessageResp.AccountAlreadyExists);

    // Map dto to model
    var appUser = _mapper.Map<TrackLottUserModel>(registerDto);
    
    // Create user
    var createResult = await _userManager.CreateAsync(appUser, registerDto.Password);
    if (!createResult.Succeeded) return BadRequest(createResult.Errors.FirstOrDefault());

    // Assign user basic permissions
    var roleResult = await _userManager.AddToRoleAsync(appUser, AppRole.User);
    if (!roleResult.Succeeded)
      return StatusCode(StatusCodes.Status500InternalServerError, MessageResp.AddToRoleFailed);

    // Create Jwt token with user claims 
    var claims = await CreateClaimsList(appUser);
    var token = _tokenService.CreateToken(claims);
    if (token == null)
      return StatusCode(StatusCodes.Status500InternalServerError, MessageResp.UnableToWriteToken);

    // Create email confirmation token
    var urlSafeUserId = Base64UrlEncoder.Encode(appUser.Id.ToString());
    var confirmationCode = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
    var urlSafeConfirmationCode = Base64UrlEncoder.Encode(confirmationCode);
    var confirmationUrl =
      $"{DomainName.TrackLottUsualAppsCom}{EndRoute.AccountConfirmAbs}?id={urlSafeUserId}&code={urlSafeConfirmationCode}";

    // Send account confirmation email
    var emailSuccess = await _emailService.SendConfirmationEmailAsync(
      new EmailPropsDto
      {
        TemplateId = EmailTemplateId.EmailConfirmation,
        Address = appUser.Email,
        TemplateDataDto = new ConfirmationEmailTemplateDataDto()
        {
          EmailSubject = "Test Confirmation Email Token",
          TrackLottReceiverGivenName = appUser.GivenName,
          TrackLottReceiverSurname = appUser.Surname,
          TrackLottReceiverAddress = appUser.Email,
          TrackLottEmailConfirmationTokenUrl = confirmationUrl
        }
      }
    );
    return Ok(emailSuccess);
  }

  // ACCOUNT EMAIL CONFIRMATION CONTROLLER ACTION
  [HttpPost(EndRoute.Confirm), AllowAnonymous]
  public async Task<ActionResult<string>> ConfirmEmail([FromQuery] string id,
    [FromQuery(Name = "code")] string confirmationCode)
  {
    var userId = Guid.Parse(Base64UrlEncoder.Decode(id));
    var user = await _userManager.Users.SingleOrDefaultAsync(model => model.Id.Equals(userId));
    if (user == null) return Unauthorized(MessageResp.UserNotExist);

    var code = Base64UrlEncoder.Decode(confirmationCode);
    if (code == null) return Unauthorized(MessageResp.InvalidToken);

    var result = _userManager.ConfirmEmailAsync(user, code);
    if (!result.IsCompletedSuccessfully) return Unauthorized(MessageResp.InvalidToken);
    return Ok(MessageResp.EmailConfirmed);
  }

  // ACCOUNT LOGIN CONTROLLER ACTION
  [HttpPost(EndRoute.Login), AllowAnonymous]
  public async Task<ActionResult<WebTokenDto>> Login(LoginDto loginDto)
  {
    var user = await _userManager.Users.SingleOrDefaultAsync(rec =>
      rec.NormalizedEmail.Equals(loginDto.Email.Normalize()));
    if (user == null) return Unauthorized(MessageResp.InvalidLoginDetails);

    var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);
    if (!result.Succeeded) return Unauthorized(MessageResp.InvalidLoginDetails);

    var claims = await CreateClaimsList(user);
    var token = _tokenService.CreateToken(claims);
    if (token == null) StatusCode(StatusCodes.Status500InternalServerError, MessageResp.UnableToWriteToken);

    return new WebTokenDto(token);
  }

  // PROFILE INFO CONTROLLER ACTION
  [HttpPost(EndRoute.Show)]
  public async Task<ActionResult<ProfileDto>> ShowUser()
  {
    var userId = _jwtClaimsService.GetGuidIdClaim();
    if (userId == null) return Unauthorized(MessageResp.InvalidToken);

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec =>
      rec.Id.Equals(userId));
    if (appUser == null) return BadRequest(MessageResp.UserNotExist);

    var profile = _mapper.Map<ProfileDto>(appUser);
    return profile;
  }

  [HttpPut(EndRoute.UpdateInfo)]
  public async Task<ActionResult<TrackLottUserModel>> UpdateInfo(ProfileUpdateDto profileUpdateDto)
  {
    var userEmail = _jwtClaimsService.GetNormalisedEmailClaim();
    if (userEmail == null) return BadRequest(MessageResp.InvalidToken);

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec => rec.NormalizedEmail.Equals(userEmail));
    if (appUser == null)
      return BadRequest(MessageResp.UserNotExist);

    _mapper.Map(profileUpdateDto, appUser);

    var res = await _userManager.UpdateAsync(appUser);
    if (!res.Succeeded) return BadRequest(MessageResp.GenericError);
    return NoContent();
  }

  [HttpPost(EndRoute.UpdatePassword)]
  public async Task<ActionResult<string>> UpdatePassword(ChangePasswordDto changePasswordDto)
  {
    if (!changePasswordDto.newPassword.Equals(changePasswordDto.repeatPassword, StringComparison.Ordinal))
      return BadRequest(MessageResp.PasswordsMismatch);

    var userEmail = _jwtClaimsService.GetNormalisedEmailClaim();
    if (userEmail == null) return BadRequest(MessageResp.InvalidToken);

    var appUser = await _userManager.Users.SingleOrDefaultAsync(rec => rec.NormalizedEmail.Equals(userEmail));
    if (appUser == null) return BadRequest(MessageResp.UserNotExist);

    var result =
      await _userManager.ChangePasswordAsync(appUser, changePasswordDto.currentPassword, changePasswordDto.newPassword);

    return result.Succeeded
      ? MessageResp.PasswordUpdated
      : BadRequest(MessageResp.PasswordChangeFailed);
  }

  private async Task<IEnumerable<Claim>> CreateClaimsList(TrackLottUserModel userModel)
  {
    // PRIVATE: CREATE CLAIMS LIST
    var claims = new List<Claim>
    {
      new(JwtRegisteredClaimNames.Sub, userModel.Id.ToString()),
      new(CustomClaimType.ConfirmedAccount, userModel.EmailConfirmed.ToString())
    };
    var roles = await _userManager.GetRolesAsync(userModel);
    claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
    return claims;
  }
}