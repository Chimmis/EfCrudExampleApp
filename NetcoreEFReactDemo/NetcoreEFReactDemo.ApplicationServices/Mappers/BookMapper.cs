using NetcoreEFReactDemo.ApplicationServices.Dto;
using NetcoreEFReactDemo.Domain;

namespace NetcoreEFReactDemo.ApplicationServices.Mappers
{
    public static class BookMapper
    {
        public static Book MapBookFromDto(BookDto dto)
        {
            return new Book
            {
                Author = dto.Author,
                Name = dto.Name,
                Quantity = dto.Quantity,
                Year = dto.Year,
            };
        }

        public static BookDto MapDtoFromBook(Book book)
        {
            return new BookDto
            {
                Year = book.Year,
                Author = book.Author,
                Name = book.Name,
                Quantity = book.Quantity,
                Id = book.Id,
            };
        }
    }
}
