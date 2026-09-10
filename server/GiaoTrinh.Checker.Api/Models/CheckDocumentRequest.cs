namespace GiaoTrinh.Checker.Api.Models;

public sealed class CheckDocumentRequest
{
    public string Language { get; set; }
        = "auto";

    public List<ParagraphRequest> Paragraphs
    {
        get;
        set;
    } = [];
}