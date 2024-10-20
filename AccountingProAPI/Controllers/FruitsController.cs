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
    [Route("api/[controller]")]
    public class FruitsController : ControllerBase
    {
           private readonly MyDbContext _context;

        public FruitsController(MyDbContext context)
        {
            _context = context;
        }
          [HttpGet]
        public async Task<ActionResult<IEnumerable<Fruits>>> GetFruits()
        {
            return await _context.Fruits.ToListAsync();
        }

        [HttpPost]
         public async Task<IActionResult> PostFruits(Fruits fruit)
        {
            await _context.Fruits.AddAsync(fruit);
            await _context.SaveChangesAsync();
            return Ok(fruit);
        }
    }
}