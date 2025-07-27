using GerenciadorDeAcademia.API.Data;
using GerenciadorDeAcademia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeAcademia.API.Endpoints
{
    public static class InstrutorEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/instrutores").WithTags("Instrutores");

            group.MapGet("/", async (AcademiaDbContext db) => await db.Instrutores.ToListAsync());
            
            group.MapPost("/", async (Instrutor instrutor, AcademiaDbContext db) => {
                db.Instrutores.Add(instrutor);
                await db.SaveChangesAsync();
                return Results.Created($"/api/instrutores/{instrutor.Id}", instrutor);
            });
            
            group.MapPut("/{id}", async (int id, Instrutor instrutorInput, AcademiaDbContext db) => {
                var instrutorDb = await db.Instrutores.FindAsync(id);
                if (instrutorDb is null) return Results.NotFound();
                instrutorDb.Nome = instrutorInput.Nome;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id}", async (int id, AcademiaDbContext db) => {
                var instrutor = await db.Instrutores.FindAsync(id);
                if (instrutor is null) return Results.NotFound();
                db.Instrutores.Remove(instrutor);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}