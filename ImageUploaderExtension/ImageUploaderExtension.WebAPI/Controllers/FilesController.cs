using ImageUploaderExtension.Application.Features.Files.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ImageUploaderExtension.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly ISender _mediator;

        public FilesController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, int expirationDays)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Lütfen bir dosya seçin.");
            }

            var command = new UploadFileCommand
            {
                ExpirationDays = expirationDays,
                FileName = file.FileName,
                MimeType = file.ContentType,
                FileStream = file.OpenReadStream()
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
