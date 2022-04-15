using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackLott.Data.Migrations
{
    public partial class MakeLotterResultsDrawNumberUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LotteryResults_DrawNumber",
                table: "LotteryResults",
                column: "DrawNumber",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LotteryResults_DrawNumber",
                table: "LotteryResults");
        }
    }
}
