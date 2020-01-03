using Microsoft.EntityFrameworkCore;
using TaskApp_API.models;

namespace TaskApp_API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<Task> Tasks { get; set; }
    }
}