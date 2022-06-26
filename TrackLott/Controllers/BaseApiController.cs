using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TrackLott.Constants;

namespace TrackLott.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthPolicyName.RequireAuthenticatedUser)]
public class BaseApiController : ControllerBase
{
}