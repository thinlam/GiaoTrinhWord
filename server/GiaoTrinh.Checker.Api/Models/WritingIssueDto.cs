namespace GiaoTrinh.Checker.Api.Models;

public sealed class WritingIssueDto
{
    public string Id { get; set; }
        = string.Empty;

    public string ParagraphId { get; set; }
        = string.Empty;

    public int Start { get; set; }

    public int Length { get; set; }

    public string Original { get; set; }
        = string.Empty;

    public string Replacement { get; set; }
        = string.Empty;

    public string Language { get; set; }
        = "unknown";

    public string Category { get; set; }
        = "grammar";

    public string Severity { get; set; }
        = "warning";

    public string Title { get; set; }
        = string.Empty;

    public string Message { get; set; }
        = string.Empty;

    public double Confidence { get; set; }
}