using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingProAPI.Data;
using AccountingProAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AccountingProAPI.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly MyDbContext _context;
        public EmployeeController(MyDbContext context)
        {
            _context = context;
        }

        //Get:api/employees
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            return _context.Employees.ToList();
        }

        //Get:api/employees/id
        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeeById(int id)
        {
            int emp_id = id;
            var employee = _context.Employees.Find(emp_id);

            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }
        // POST: api/employees


        [HttpPost]
        public async Task<IActionResult> SaveEmployee([FromBody] Employee employee)
        {
            employee.emp_doj = DateTime.Now.ToString();
            employee.emp_isAdmin = false;
            Console.WriteLine(employee);
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Employee posted successfully" });
        }

        // PUT: api/Employees/id
      [HttpPut("{id}")]
public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Employee employee)
{
    employee.emp_id=id;

    var existingEmployee = await _context.Employees.FindAsync(id);

    if (existingEmployee == null)
    {
        return NotFound();
    }

    _context.Entry(existingEmployee).CurrentValues.SetValues(employee);

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!EmployeeExists(id))
        {
            return NotFound();
        }
        else
        {
            throw; // Handle other specific exceptions as needed
        }
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"An error occurred: {ex.Message}" });
    }

    return Ok(new { message = "Employee updated successfully" });
}

private bool EmployeeExists(int id)
{
    return _context.Employees.Any(e => e.emp_id == id);
}

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            int emp_id = id;
            var employee = _context.Employees.Find(emp_id);

            if (employee == null)
            {
                return NotFound();
            }
            _context.Employees.Remove(employee);
            int removed = _context.SaveChanges();

            return Ok(removed);
        }
    }
}
