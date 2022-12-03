using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TrackLott.Models;

namespace TrackLott.Data;

public class TrackLottDbContext : IdentityDbContext<TrackLottUserModel, TrackLottAppRoleModel, Guid>
{
  public TrackLottDbContext(DbContextOptions<TrackLottDbContext> options) : base(options)
  {
  }

  public DbSet<LottoResultModel> LottoResults { get; set; }
  public DbSet<CombinationModel> Combinations { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<LottoResultModel>().HasKey(model => new { model.ProductId, model.DrawNumber });

    builder.Entity<LottoResultModel>().HasMany(lr => lr.Combinations)
      .WithOne(c => c.LottoResult)
      .HasForeignKey(c => new { LottoResultProductId = c.LottoProductId, LottoResultDrawNumber = c.LottoDrawNumber });
  }
}