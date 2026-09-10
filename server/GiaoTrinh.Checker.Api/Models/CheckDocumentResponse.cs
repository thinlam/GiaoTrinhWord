namespace GiaoTrinh.Checker.Api.Models;

public sealed class CheckDocumentResponse
{
    public string DetectedLanguage { get; set; }
        = "unknown";

    public int Score { get; set; }

    public List<WritingIssueDto> Issues
    {
        get;
        set;
    } = [];
}