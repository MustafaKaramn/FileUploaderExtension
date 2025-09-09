using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Domain.Entities
{
    public class StoredFile
    {
        public Guid Id { get; set; }
        public string OriginalFileName { get; set; }
        public string StoredFileName { get; set; }
        public string Path { get; set; }
        public string MimeType { get; set; }
        public long SizeInBytes { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
