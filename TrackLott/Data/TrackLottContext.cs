using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TrackLott.Entities;

namespace TrackLott.Data;

public class TrackLottContext : IdentityDbContext<Member, Ability, Guid, IdentityUserClaim<Guid>, MemberAbility,
  IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>
{
  public TrackLottContext(DbContextOptions options) : base(options)
  {
  }

  public DbSet<Combination> Combinations { get; set; }

  public DbSet<LotteryResult> LotteryResults { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<LotteryResult>().HasIndex(lr => lr.DrawNumber).IsUnique();

    builder.Entity<LotteryResult>().HasMany(lr => lr.Combinations).WithOne(c => c.LotteryResult)
      .HasForeignKey(c => c.LotteryResultId);
  }
}