using GerenciadorDeAcademia.API.Data;
using GerenciadorDeAcademia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeAcademia.API.Endpoints
{
    public static class PlanoDeTreinoEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/planosdetreino").WithTags("Planos de Treino");

            group.MapGet("/", async (AcademiaDbContext db) => await db.PlanosDeTreino.ToListAsync());

            group.MapPost("/", async (PlanoDeTreino plano, AcademiaDbContext db) => {
                db.PlanosDeTreino.Add(plano);
                await db.SaveChangesAsync();
                return Results.Created($"/api/planosdetreino/{plano.Id}", plano);
            });

            group.MapPut("/{id}", async (int id, PlanoDeTreino planoInput, AcademiaDbContext db) => {
                var planoDb = await db.PlanosDeTreino.FindAsync(id);
                if (planoDb is null) return Results.NotFound();
                planoDb.Nome = planoInput.Nome;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id}", async (int id, AcademiaDbContext db) => {
                var plano = await db.PlanosDeTreino.FindAsync(id);
                if (plano is null) return Results.NotFound();
                db.PlanosDeTreino.Remove(plano);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}