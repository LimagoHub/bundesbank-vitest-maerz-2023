var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles(); // Sorgt dafuer, dass bei leerer URL die Indexseite gezogen
app.UseStaticFiles(); // sorgt dafuer dass die Seiten in der WWWRoot gezogen werden
app.UseAuthorization();

app.MapControllers();

app.Run();
