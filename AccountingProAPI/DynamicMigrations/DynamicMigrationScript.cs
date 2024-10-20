using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingProAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace AccountingProAPI.DynamicMigrations
{
    public static class DynamicMigrationScript
    {
          public static void DynamicMigrationMiddleware(this IApplicationBuilder obj){
            //need to write code to generate database dynamically without using tool 
            //dotnet ef
            using(var obj1 = obj.ApplicationServices.CreateScope()){
            var dbContext = obj1.ServiceProvider.GetRequiredService<MyDbContext>();
            dbContext.Database.Migrate();
                //what will be here will be in program.cs also (employeedbcontext or databasefirstapproachcontext)
            }
        }
    }
}