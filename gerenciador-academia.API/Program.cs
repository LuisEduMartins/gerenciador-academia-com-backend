using GerenciadorDeAcademia.API.Data;
using GerenciadorDeAcademia.API.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AcademiaDbContext>(options => 
    options.UseInMemoryDatabase("AcademiaDb"));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") 
              .AllowAnyHeader()  
              .AllowAnyMethod(); 
    });
});


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




app.UseCors("AllowReactApp");


InstrutorEndpoints.Map(app);
ExercicioEndpoints.Map(app);
PlanoDeTreinoEndpoints.Map(app);
MembroEndpoints.Map(app);


app.Run();