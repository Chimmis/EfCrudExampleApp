using Microsoft.EntityFrameworkCore;
using NetcoreEFReactDemo.Abstractions;
using NetcoreEFReactDemo.ApplicationServices.Dto;
using NetcoreEFReactDemo.ApplicationServices.Mappers;
using NetcoreEFReactDemo.DataAccess;
using NetcoreEFReactDemo.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetcoreEFReactDemo.ApplicationServices
{
    public class BookReadService
    {
        private readonly BookRepository bookRepository;

        public BookReadService(BookRepository bookRepository)
        {
            this.bookRepository = bookRepository;
        }

        public async Task<Result<BookDto>> GetBook(Guid id)
        {
            var book = await bookRepository.Get(id);
            if (book is null)
            {
                return Result<BookDto>.CreateErrorResult($"Book with id {id} was not found.");
            }

            return Result<BookDto>.Create(BookMapper.MapDtoFromBook(book));
        }

        public async Task<Result<List<BookDto>>> GetBooks()
        {
            var books = await bookRepository
                .GetAll()
                .Select(x => BookMapper.MapDtoFromBook(x))
                .ToListAsync();

            return Result<List<BookDto>>.Create(books);
        }
    }
}
