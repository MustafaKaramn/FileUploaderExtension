using ImageUploaderExtension.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageUploaderExtension.Application.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<StoredFile> StoredFiles { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
