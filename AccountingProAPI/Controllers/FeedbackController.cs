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
    public class FeedbackController : ControllerBase
    {
        MyDbContext _context;
        public FeedbackController(MyDbContext context)
        {
            _context = context;
        }
        [HttpPost("postfeedbacks")]
        async public Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
        {
            
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return Ok(feedback);
        }

        [HttpGet("feedbacks")]
        async public Task<IEnumerable<Feedback>> GetFeedbacks()
        {
            return await _context.Feedbacks.ToListAsync(); 
        }
    }
}