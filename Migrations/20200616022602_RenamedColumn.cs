using Microsoft.EntityFrameworkCore.Migrations;

namespace CableManager.Migrations
{
    public partial class RenamedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Cables");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Cables",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Cables");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Cables",
                type: "text",
                nullable: true);
        }
    }
}
