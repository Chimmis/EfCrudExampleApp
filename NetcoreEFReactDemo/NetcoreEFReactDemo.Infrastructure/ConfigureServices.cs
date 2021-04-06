using Microsoft.Extensions.DependencyInjection;
using NetcoreEFReactDemo.ApplicationServices;
using NetcoreEFReactDemo.DataAccess;

namespace NetcoreEFReactDemo.Infrastructure
{
    public static class ConfigureServices
    {
        public static void ConfigureApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<BookRepository>()
                .AddScoped<BookReadService>()
                .AddScoped<BookWriteService>();
        }
    }
}
