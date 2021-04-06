using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NetcoreEFReactDemo.Domain;

namespace NetcoreEFReactDemo.DataAccess
{
    public class BookRepository
    {
        private readonly ExampleDbContext dbContext;

        public BookRepository(ExampleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task SaveChanges()
        {
            await this.dbContext.SaveChangesAsync();
        }

        public void Add(Book book)
        {
            dbContext.Books.Add(book);
        }

        public void Remove(Book book)
        {
            dbContext.Books.Add(book);
        }

        public async Task<Book> Get (Guid id)
        {
            return await dbContext.Books.FirstOrDefaultAsync(x => x.Id == id);
        }

        public IQueryable<Book> GetAll()
        {
            return dbContext.Books.AsQueryable();
        }
    }
}
