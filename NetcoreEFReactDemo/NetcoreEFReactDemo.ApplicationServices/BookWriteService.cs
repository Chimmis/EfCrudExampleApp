using System;
using NetcoreEFReactDemo.Abstractions;
using NetcoreEFReactDemo.ApplicationServices.Dto;
using NetcoreEFReactDemo.ApplicationServices.Mappers;
using NetcoreEFReactDemo.DataAccess;
using NetcoreEFReactDemo.Domain;
using System.Threading.Tasks;

namespace NetcoreEFReactDemo.ApplicationServices
{
    public class BookWriteService
    {
        private readonly BookRepository bookRepository;

        public BookWriteService(BookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public async Task<Result<BookDto>> AddBook(BookDto dto)
        {
            var book = BookMapper.MapBookFromDto(dto);
            bookRepository.Add(book);

            try
            {
                await bookRepository.SaveChanges();
            }
            catch (Exception e)
            {
                // log exception
                Result<Book>.CreateErrorResult("Oops! Something went wrong, please refresh the page and try again.");
            }
            

            return Result<BookDto>.Create(dto);
        }

        public async Task<Result<string>> DeleteBook(Guid id)
        {
            var book = await bookRepository.Get(id);
            if (book is null)
            {
                return Result<string>.CreateErrorResult($"Book with id {id} not found.");
            }

            bookRepository.Remove(book);
            await bookRepository.SaveChanges();

            try
            {
                bookRepository.SaveChanges();
            }
            catch (Exception e)
            {
                // log exception
                Result<Book>.CreateErrorResult("Oops! Something went wrong, please refresh the page and try again.");
            }

            return Result<string>.Create(id.ToString());
        }
    }
}
