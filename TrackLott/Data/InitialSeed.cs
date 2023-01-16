using Microsoft.EntityFrameworkCore;
using TrackLott.Constants;
using TrackLott.Models;

namespace TrackLott.Data;

public static class InitialSeed
{
  public static async Task AddRoles(TrackLottDbContext context)
  {
    if (await context.Roles.AnyAsync()) return;
    await context.Roles.AddRangeAsync(
      new TrackLottAppRoleModel { Name = AppRole.Admin, NormalizedName = NormalizedText(AppRole.Admin) },
      new TrackLottAppRoleModel { Name = AppRole.User, NormalizedName = NormalizedText(AppRole.User) });
    await context.SaveChangesAsync();
  }

  private static string NormalizedText(string txt)
  {
    return txt.Normalize().ToUpper();
  }
}