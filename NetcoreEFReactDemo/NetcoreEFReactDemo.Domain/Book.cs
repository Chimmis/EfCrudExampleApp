namespace NetcoreEFReactDemo.Domain
{
    public class Book : DomainEntity
    {
        public int Year { get;set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public int Quantity { get; set; }
    }
}
