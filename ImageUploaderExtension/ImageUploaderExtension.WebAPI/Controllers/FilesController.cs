using ImageUploaderExtension.Application.Features.Files.Commands;
using ImageUploaderExtension.WebAPI.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace ImageUploaderExtension.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableRateLimiting("FileUploadPolicy")]
    public class FilesController : ControllerBase
    {
        private readonly ISender _mediator;

        public FilesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] UploadFileRequest request)
        {
            var command = new UploadFileCommand
            {
                ExpirationDays = request.ExpirationDays,
                FileName = request.File.FileName,
                MimeType = request.File.ContentType,
                FileStream = request.File.OpenReadStream()
            };

            var filePath = await _mediator.Send(command);

            if (string.IsNullOrEmpty(filePath))
            {
                return StatusCode(500, "Dosya yüklenirken bir sunucu hatası oluştu.");
            }

            var fileUrl = $"{Request.Scheme}://{Request.Host}{filePath}";
            return Ok(new { FileUrl = fileUrl });
        }
    }
}
