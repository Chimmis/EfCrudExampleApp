using Microsoft.EntityFrameworkCore;
using NetcoreEFReactDemo.Domain;

namespace NetcoreEFReactDemo.DataAccess
{
    public class ExampleDbContext : DbContext
    {
        public ExampleDbContext(DbContextOptions<ExampleDbContext> options): base(options)
        {
            
        }

        public virtual DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Book>().Property(x => x.Author)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Book>().Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Book>().Property(x => x.Quantity)
                .IsRequired();

            modelBuilder.Entity<Book>().Property(x => x.Year);

            base.OnModelCreating(modelBuilder);
        }
    }
}
