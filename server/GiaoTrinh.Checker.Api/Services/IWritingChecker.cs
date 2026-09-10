using GiaoTrinh.Checker.Api.Models;

namespace GiaoTrinh.Checker.Api.Services;

public interface IWritingChecker
{
    Task<CheckDocumentResponse> CheckAsync(
        CheckDocumentRequest request,
        CancellationToken cancellationToken = default
    );
}