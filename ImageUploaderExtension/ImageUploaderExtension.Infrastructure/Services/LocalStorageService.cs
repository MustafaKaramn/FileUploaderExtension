using ImageUploaderExtension.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Infrastructure.Services
{
    internal class LocalStorageService : IFileStorageService
    {
        public Task<string> SaveFileAsync(Stream fileStream, string fileName, string mimeType)
        {
            throw new NotImplementedException();
        }
    }
}
