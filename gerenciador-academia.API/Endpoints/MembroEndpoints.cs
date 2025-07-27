using GerenciadorDeAcademia.API.Data;
using GerenciadorDeAcademia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeAcademia.API.Endpoints
{
    public static class MembroEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/membros").WithTags("Membros");

            group.MapGet("/", async (AcademiaDbContext db) => await db.Membros.ToListAsync());
            
            group.MapPost("/", async (Membro membro, AcademiaDbContext db) => {
                db.Membros.Add(membro);
                await db.SaveChangesAsync();
                return Results.Created($"/api/membros/{membro.Id}", membro);
            });
            
            group.MapPut("/{id}", async (int id, Membro membroInput, AcademiaDbContext db) => {
                var membroDb = await db.Membros.FindAsync(id);
                if (membroDb is null) return Results.NotFound();
                membroDb.Nome = membroInput.Nome;
                membroDb.Email = membroInput.Email;
                membroDb.PlanoDeTreinoId = membroInput.PlanoDeTreinoId;
                membroDb.InstrutorId = membroInput.InstrutorId;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id}", async (int id, AcademiaDbContext db) => {
                var membro = await db.Membros.FindAsync(id);
                if (membro is null) return Results.NotFound();
                db.Membros.Remove(membro);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}