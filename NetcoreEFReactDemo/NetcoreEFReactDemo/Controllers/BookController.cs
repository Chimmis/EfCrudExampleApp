using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetcoreEFReactDemo.ApplicationServices;
using NetcoreEFReactDemo.ApplicationServices.Dto;

namespace NetcoreEFReactDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookReadService bookReadService;
        private readonly BookWriteService bookWriteService;

        public BooksController(BookReadService bookReadService, BookWriteService bookWriteService)
        {
            this.bookReadService = bookReadService;
            this.bookWriteService = bookWriteService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result =  await bookReadService.GetBook(id);
            if (result.Valid)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await bookReadService.GetBooks();
            if (result.Valid)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(BookDto dto)
        {
            var result = await bookWriteService.AddBook(dto);
            if (result.Valid)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await bookWriteService.DeleteBook(id);
            if (result.Valid)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
