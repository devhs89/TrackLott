using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrackLott.Controllers;

public class AdminController : BaseApiController
{
  [HttpGet("admin")]
  [Authorize(Policy = "RequireAdminRole")]
  public ActionResult GetUsersWithRoles()
  {
    return Ok("Admin Http Post");
  }

  [HttpGet("normal")]
  [Authorize(Policy = "RequireMemberRole")]
  public ActionResult GetUserForMember()
  {
    return Ok("Normal User");
  }
}