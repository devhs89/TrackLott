using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackLott.Data.Migrations
{
    public partial class RemoveOptionalNumbersFromCombinations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionalNumbers",
                table: "Combinations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OptionalNumbers",
                table: "Combinations",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
