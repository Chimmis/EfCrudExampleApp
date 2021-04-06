using System;

namespace NetcoreEFReactDemo.ApplicationServices.Dto
{
    public class BookDto
    {
        public Guid Id { get; set; }

        public int Year { get;set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public int Quantity { get; set; }
    }
}
