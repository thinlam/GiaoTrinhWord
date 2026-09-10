using GiaoTrinh.Checker.Api.Models;
using GiaoTrinh.Checker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GiaoTrinh.Checker.Api.Controllers;

[ApiController]
[Route("api/checker")]
public sealed class CheckerController
    : ControllerBase
{
    private readonly IWritingChecker
        _writingChecker;

    public CheckerController(
        IWritingChecker writingChecker)
    {
        _writingChecker =
            writingChecker;
    }

    [HttpPost("check")]
    public async Task<
        ActionResult<CheckDocumentResponse>>
        Check(
            [FromBody]
            CheckDocumentRequest request,

            CancellationToken cancellationToken)
    {
        if (
            request.Paragraphs.Count == 0)
        {
            return Ok(
                new CheckDocumentResponse
                {
                    DetectedLanguage =
                        "unknown",

                    Score =
                        100
                });
        }

        var totalCharacters =
            request.Paragraphs
                .Sum(
                    x =>
                        x.Text.Length);

        if (totalCharacters > 50000)
        {
            return BadRequest(
                "Văn bản quá dài cho một lần kiểm tra."
            );
        }

        var result =
            await _writingChecker
                .CheckAsync(
                    request,
                    cancellationToken);

        return Ok(result);
    }
}