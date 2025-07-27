using GerenciadorDeAcademia.API.Data;
using GerenciadorDeAcademia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeAcademia.API.Endpoints
{
    public static class ExercicioEndpoints
    {
        public static void Map(WebApplication app)
        {
            var group = app.MapGroup("/api/exercicios").WithTags("Exercícios");

            group.MapGet("/", async (AcademiaDbContext db) => await db.Exercicios.ToListAsync());
            
            group.MapPost("/", async (Exercicio exercicio, AcademiaDbContext db) => {
                db.Exercicios.Add(exercicio);
                await db.SaveChangesAsync();
                return Results.Created($"/api/exercicios/{exercicio.Id}", exercicio);
            });
            
            group.MapPut("/{id}", async (int id, Exercicio exercicioInput, AcademiaDbContext db) => {
                var exercicioDb = await db.Exercicios.FindAsync(id);
                if (exercicioDb is null) return Results.NotFound();
                exercicioDb.Nome = exercicioInput.Nome;
                exercicioDb.GrupoMuscular = exercicioInput.GrupoMuscular;
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            group.MapDelete("/{id}", async (int id, AcademiaDbContext db) => {
                var exercicio = await db.Exercicios.FindAsync(id);
                if (exercicio is null) return Results.NotFound();
                db.Exercicios.Remove(exercicio);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
