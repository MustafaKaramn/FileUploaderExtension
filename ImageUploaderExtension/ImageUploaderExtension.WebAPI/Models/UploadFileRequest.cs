using System.ComponentModel.DataAnnotations;

namespace ImageUploaderExtension.WebAPI.Models
{
    public class UploadFileRequest
    {
        [Required(ErrorMessage = "Lütfen bir dosya seçin.")]
        public IFormFile File { get; set; }

        [Required(ErrorMessage = "Lütfen depolama süresini belirtin.")]
        [Range(1, 30, ErrorMessage = "Depolama süresi 1 ile 30 gün arasında olmalıdır.")]
        public int ExpirationDays { get; set; }
    }
}
