using GerenciadorDeAcademia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciadorDeAcademia.API.Data
{
    public class AcademiaDbContext : DbContext
    {
        public AcademiaDbContext(DbContextOptions<AcademiaDbContext> options) : base(options) {}

        public DbSet<Membro> Membros { get; set; }
        public DbSet<PlanoDeTreino> PlanosDeTreino { get; set; }
        public DbSet<Exercicio> Exercicios { get; set; }
        public DbSet<Instrutor> Instrutores { get; set; }
    }
}