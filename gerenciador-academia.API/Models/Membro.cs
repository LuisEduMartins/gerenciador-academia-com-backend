namespace GerenciadorDeAcademia.API.Models
{
    public class Membro
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty; 
        public string Email { get; set; } = string.Empty; 
        public int PlanoDeTreinoId { get; set; } 
        public int InstrutorId { get; set; }
    }
}