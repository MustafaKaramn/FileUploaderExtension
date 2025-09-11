using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Domain.Entities
{
    public class StoredFile
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string StoredFileName { get; set; }

        [Required]
        [MaxLength(1024)]
        public string Path { get; set; }

        [Required]
        [MaxLength(100)]
        public string MimeType { get; set; }
        public long SizeInBytes { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
