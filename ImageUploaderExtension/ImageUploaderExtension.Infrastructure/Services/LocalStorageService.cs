using ImageUploaderExtension.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;


namespace ImageUploaderExtension.Infrastructure.Services
{
    internal class LocalStorageService : IFileStorageService
    {

        private readonly IHostEnvironment _env;

        public LocalStorageService(IHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SaveFileAsync(Stream fileStream, string fileName, string mimeType)
        {
            var uploadsFolderPath = Path.Combine(_env.ContentRootPath, "uploads");

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            var fileExtension = Path.GetExtension(fileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var fullPath = Path.Combine(uploadsFolderPath, uniqueFileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await fileStream.CopyToAsync(stream);
            }

            return fullPath;
        }
    }
}
