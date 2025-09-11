using ImageUploaderExtension.Application.Interfaces;
using ImageUploaderExtension.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Application.Features.Files.Commands
{
    public class UploadFileCommandHandler : IRequestHandler<UploadFileCommand, string>
    {
        private readonly IApplicationDbContext _context;
        private readonly IFileStorageService _storageService;

        public UploadFileCommandHandler(IApplicationDbContext context, IFileStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        public async Task<string> Handle(UploadFileCommand request, CancellationToken cancellationToken)
        {
            var storedPath = await _storageService.SaveFileAsync(
                request.FileStream,
                request.FileName,
                request.MimeType);

            if (string.IsNullOrEmpty(storedPath))
            {
                return null;
            }

            var entity = new StoredFile
            {
                Id = Guid.NewGuid(),
                OriginalFileName = request.FileName,
                StoredFileName = Path.GetFileName(storedPath),
                Path = storedPath,
                MimeType = request.MimeType,
                SizeInBytes = request.FileStream.Length,
                UploadedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(request.ExpirationDays)
            };

            await _context.StoredFiles.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return storedPath;
        }
    }
}
