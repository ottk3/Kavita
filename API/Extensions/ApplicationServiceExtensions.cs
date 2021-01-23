﻿using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Hangfire;
using Hangfire.LiteDB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<ITaskScheduler, TaskScheduler>();
            services.AddScoped<IDirectoryService, DirectoryService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IScannerService, ScannerService>();



            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            services.AddLogging(loggingBuilder =>
            {
                var loggingSection = config.GetSection("Logging");
                loggingBuilder.AddFile(loggingSection);
            });

            services.AddHangfire(configuration => configuration
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings()
                .UseLiteDbStorage());
            
            // Add the processing server as IHostedService
            services.AddHangfireServer();

            return services;
        }
    }
}