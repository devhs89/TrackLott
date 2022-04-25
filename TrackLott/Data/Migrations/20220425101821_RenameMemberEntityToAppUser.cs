using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrackLott.Data.Migrations
{
    public partial class RenameMemberEntityToAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Combinations_AspNetUsers_MemberId",
                table: "Combinations");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "Combinations",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Combinations_MemberId",
                table: "Combinations",
                newName: "IX_Combinations_AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Combinations_AspNetUsers_AppUserId",
                table: "Combinations",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Combinations_AspNetUsers_AppUserId",
                table: "Combinations");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Combinations",
                newName: "MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Combinations_AppUserId",
                table: "Combinations",
                newName: "IX_Combinations_MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Combinations_AspNetUsers_MemberId",
                table: "Combinations",
                column: "MemberId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
