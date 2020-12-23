using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Security.Migrations
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
                values: new object[] { 1, new byte[] { 228, 231, 75, 1, 106, 129, 78, 75, 140, 215, 49, 22, 187, 16, 218, 105 }, "Tom", new byte[] { 40, 199, 122, 210, 85, 208, 76, 79, 152, 139, 19, 118, 39, 197, 39, 148 }, new byte[] { 180, 180, 112, 155, 204, 206, 94, 71, 164, 20, 155, 27, 224, 148, 101, 96 } });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "NotSalt", "Password" },
                values: new object[] { 2, new byte[] { 184, 61, 165, 131, 204, 206, 146, 78, 176, 139, 233, 223, 246, 229, 49, 109 }, "Alice", new byte[] { 33, 137, 240, 110, 52, 125, 2, 77, 180, 251, 250, 219, 207, 208, 221, 58 }, new byte[] { 3, 21, 124, 48, 31, 122, 224, 73, 149, 29, 118, 193, 80, 167, 150, 154 } });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "NotSalt", "Password" },
                values: new object[] { 3, new byte[] { 18, 131, 213, 245, 250, 96, 219, 71, 128, 75, 119, 46, 94, 223, 70, 247 }, "Sam", new byte[] { 121, 80, 249, 138, 229, 241, 173, 79, 164, 28, 235, 20, 101, 64, 130, 126 }, new byte[] { 236, 238, 126, 69, 164, 169, 160, 65, 129, 23, 43, 52, 141, 186, 169, 215 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
