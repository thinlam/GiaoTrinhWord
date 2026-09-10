namespace GiaoTrinh.Checker.Api.Models;

public sealed class ParagraphRequest
{
    public string ParagraphId { get; set; }
        = string.Empty;

    public string Text { get; set; }
        = string.Empty;
}