using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackLott.Data.Migrations
{
    public partial class MatchLottoResultFieldsWithAdminstrationProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WinningNumbers",
                table: "LotteryResults",
                newName: "TicketNumbers");

            migrationBuilder.RenameColumn(
                name: "SuppNumbers",
                table: "LotteryResults",
                newName: "SecondaryNumbers");

            migrationBuilder.RenameColumn(
                name: "DrawName",
                table: "LotteryResults",
                newName: "Region");

            migrationBuilder.RenameColumn(
                name: "DrawDateTime",
                table: "LotteryResults",
                newName: "DrawDate");

            migrationBuilder.AddColumn<string>(
                name: "Dividends",
                table: "LotteryResults",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Game",
                table: "LotteryResults",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "PrimaryNumbers",
                table: "LotteryResults",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "LotteryResults",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dividends",
                table: "LotteryResults");

            migrationBuilder.DropColumn(
                name: "Game",
                table: "LotteryResults");

            migrationBuilder.DropColumn(
                name: "PrimaryNumbers",
                table: "LotteryResults");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "LotteryResults");

            migrationBuilder.RenameColumn(
                name: "TicketNumbers",
                table: "LotteryResults",
                newName: "WinningNumbers");

            migrationBuilder.RenameColumn(
                name: "SecondaryNumbers",
                table: "LotteryResults",
                newName: "SuppNumbers");

            migrationBuilder.RenameColumn(
                name: "Region",
                table: "LotteryResults",
                newName: "DrawName");

            migrationBuilder.RenameColumn(
                name: "DrawDate",
                table: "LotteryResults",
                newName: "DrawDateTime");
        }
    }
}
