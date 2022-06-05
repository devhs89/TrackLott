using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TrackLott.Models;

namespace TrackLott.Data;

public class TrackLottDbContext : IdentityDbContext<AppUser, AppRole, Guid, IdentityUserClaim<Guid>, AppUserAppRole,
  IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
{
  public TrackLottDbContext(DbContextOptions<TrackLottDbContext> options) : base(options)
  {
  }

  public DbSet<Combination> Combinations { get; set; }
  public DbSet<LottoResultModel> LottoResults { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<LottoResultModel>().HasMany(lr => lr.Combinations)
      .WithOne(c => c.LotteryResult)
      .HasForeignKey(c => c.LotteryResultId);
  }
}