using GiaoTrinh.Checker.Api.Services;
using OpenAI.Chat;

var builder =
    WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var apiKey =
    builder.Configuration[
        "OpenAI:ApiKey"];

if (
    string.IsNullOrWhiteSpace(
        apiKey))
{
    throw new InvalidOperationException(
        "Thiếu OpenAI API key."
    );
}

var model =
    builder.Configuration[
        "OpenAI:Model"]
    ?? "gpt-5.6-luna";

builder.Services.AddSingleton(
    new ChatClient(
        model: model,
        apiKey: apiKey));

builder.Services.AddScoped<
    IWritingChecker,
    OpenAiWritingChecker>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "WordAddin",
        policy =>
        {
            policy
                .WithOrigins(
                    "https://localhost:3000",
                    "https://giaotrinh-word.vercel.app")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app =
    builder.Build();

app.UseHttpsRedirection();

app.UseCors(
    "WordAddin");

app.MapControllers();

app.Run();