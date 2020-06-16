using Microsoft.EntityFrameworkCore.Migrations;

namespace CableManager.Migrations
{
    public partial class AddedNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Cables",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Cables");
        }
    }
}
