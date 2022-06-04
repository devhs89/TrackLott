using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TrackLott.Models;

namespace TrackLott.Data;

public class TrackLottContext : IdentityDbContext<AppUser, AppRole, Guid, IdentityUserClaim<Guid>, AppUserAppRole,
  IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
{
  public TrackLottContext(DbContextOptions options) : base(options)
  {
  }

  public DbSet<Combination> Combinations { get; set; }

  public DbSet<LottoResult> LotteryResults { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<LottoResult>().HasMany(lr => lr.Combinations).WithOne(c => c.LotteryResult)
      .HasForeignKey(c => c.LotteryResultId);
  }
}