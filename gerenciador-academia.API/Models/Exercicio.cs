namespace GerenciadorDeAcademia.API.Models
{
    public class Exercicio
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string GrupoMuscular { get; set; } = string.Empty;
    }
}