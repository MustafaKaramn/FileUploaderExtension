using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Application.Features.Files.Commands
{
    public class UploadFileCommand : IRequest<string>
    {
        public Stream FileStream { get; set; }
        public string FileName { get; set; }
        public string MimeType { get; set; }
        public int ExpirationDays { get; set; }
    }
}
