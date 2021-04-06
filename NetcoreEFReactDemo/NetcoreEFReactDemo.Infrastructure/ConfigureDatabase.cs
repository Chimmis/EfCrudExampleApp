using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetcoreEFReactDemo.DataAccess;

namespace NetcoreEFReactDemo.Infrastructure
{
    public static class ConfigureDatabase
    {
        public static void AddDatabase(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<ExampleDbContext>(builder => builder.UseSqlServer(connectionString));
        }
    }
}
