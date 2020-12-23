using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Security.Migrations.Application
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Email = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    NotSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "NotSalt", "Password" },
                values: new object[] { 1, new byte[] { 60, 135, 198, 192, 34, 224, 52, 74, 151, 251, 101, 36, 45, 197, 92, 214 }, "Tom\r\n", new byte[] { 21, 136, 209, 60, 146, 133, 163, 70, 178, 71, 202, 172, 63, 117, 91, 5 }, new byte[] { 231, 93, 210, 246, 240, 163, 76, 71, 131, 95, 93, 74, 129, 127, 236, 220 } });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "NotSalt", "Password" },
                values: new object[] { 2, new byte[] { 107, 38, 250, 205, 164, 105, 15, 79, 168, 84, 163, 228, 33, 247, 66, 58 }, "Alice\r\n", new byte[] { 187, 155, 245, 196, 131, 166, 111, 74, 185, 145, 56, 94, 142, 94, 64, 150 }, new byte[] { 85, 144, 49, 6, 138, 61, 150, 69, 140, 154, 0, 135, 84, 57, 135, 131 } });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "NotSalt", "Password" },
                values: new object[] { 3, new byte[] { 153, 213, 143, 171, 198, 227, 25, 71, 140, 130, 95, 66, 236, 34, 171, 146 }, "Sam\r\n", new byte[] { 169, 39, 111, 211, 118, 175, 79, 70, 191, 188, 14, 129, 72, 148, 187, 26 }, new byte[] { 85, 244, 252, 71, 220, 38, 59, 65, 183, 93, 139, 237, 148, 214, 87, 175 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
