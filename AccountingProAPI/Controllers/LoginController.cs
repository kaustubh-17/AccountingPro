using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingProAPI.Data;
using AccountingProAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AccountingProAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        
           private readonly MyDbContext _context;
          public LoginController(MyDbContext context)
          {
            _context=context;
          }
         [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            // Validate model
            if (model == null || string.IsNullOrEmpty(model.username) || string.IsNullOrEmpty(model.password))
            {
                return BadRequest("Invalid request. Username and password are required.");
            }

            // Check if user exists in database
            var employee = _context.Employees.SingleOrDefault(e => e.emp_username == model.username && e.emp_password == model.password);

            if (employee == null)
            {
                return Ok(null);
            }

            // If user exists, return employee data
             await _context.Logins.AddAsync(model);
             await _context.SaveChangesAsync();
             return Ok("posted");
        }

        [HttpGet("allLogins")]
        public ActionResult<IEnumerable<Login>> GetLogins()
        {
              return _context.Logins.ToList();
        }
    }
}