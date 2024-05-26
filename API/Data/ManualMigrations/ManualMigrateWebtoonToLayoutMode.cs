using System;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.Enums;
using Kavita.Common.EnvironmentInfo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Data.ManualMigrations;

/// <summary>
/// v0.8.2 moved PagingDirection.Webtoon -> LayoutMode.Webtoon. This migration migrates all user settings to handle that.
/// </summary>
public static class ManualMigrateWebtoonToLayoutMode
{
    public static async Task Migrate(DataContext context, ILogger<Program> logger)
    {
        if (await context.ManualMigrationHistory.AnyAsync(m => m.Name == "ManualMigrateWebtoonToLayoutMode"))
        {
            return;
        }

        logger.LogCritical("Running ManualMigrateWebtoonToLayoutMode migration - Please be patient, this may take some time. This is not an error");

        // Find all users with preferences that have PagingDirection set as webtoon
        if (context.AppUserPreferences != null)
        {
            var prefs = await context.AppUserPreferences.Where(p => p.ReaderMode == ReaderMode.Webtoon).ToListAsync();
            foreach (var pref in prefs)
            {
                pref.ReaderMode = ReaderMode.LeftRight;
                pref.LayoutMode = LayoutMode.Webtoon;
            }

            await context.SaveChangesAsync();
        }

        await context.ManualMigrationHistory.AddAsync(new ManualMigrationHistory()
        {
            Name = "ManualMigrateWebtoonToLayoutMode",
            ProductVersion = BuildInfo.Version.ToString(),
            RanAt = DateTime.UtcNow
        });
        await context.SaveChangesAsync();

        logger.LogCritical("Running ManualMigrateWebtoonToLayoutMode migration - Completed. This is not an error");
    }
}
