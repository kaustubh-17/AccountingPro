using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingProAPI.Models;
using ExpenseTrackerApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountingProAPI.Data
{
    public class MyDbContext : DbContext
    {
        // base class is used to call the constructor of parent class (DbContext)
        // DbContext is integral/important part of Microsoft.EntityFrameworkCore
        // DbContext interacts with database, manages db connection & performs CRUD
        public MyDbContext(DbContextOptions options) : base(options)
        {

        }

        // DbSet represents the table from db
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<EmployeePayslip> Payslips { get; set; }
        public DbSet<Feedback> Feedbacks {get; set;}
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Fruits> Fruits {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>()
            .Property(e => e.emp_id)
            .ValueGeneratedOnAdd(); // This ensures auto-incrementing
    }
        
    }
}