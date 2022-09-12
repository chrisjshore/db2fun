using Microsoft.EntityFrameworkCore;

namespace dotnet5db2
{
    public class Db2Context : DbContext
    {
        public Db2Context(DbContextOptions<Db2Context> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
    }
}
