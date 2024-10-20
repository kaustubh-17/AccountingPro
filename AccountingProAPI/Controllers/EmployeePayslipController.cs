using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountingProAPI.Data;
using AccountingProAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePayslipAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeePayslipController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
         private readonly MyDbContext _context;

        public EmployeePayslipController(IWebHostEnvironment env, MyDbContext context)
        {
            _env = env;
            _context = context;
        }

        [HttpPost("{employeeId}")]
        public async Task<IActionResult> UploadPayslip(int employeeId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var filePath = Path.Combine(_env.ContentRootPath, "Payslips", employeeId.ToString(), file.FileName);

            var directoryPath = Path.GetDirectoryName(filePath);

            if (directoryPath != null)
                Directory.CreateDirectory(directoryPath);

            else
            {
                return BadRequest("Invalid file path.");
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                
            }
            EmployeePayslip p = new EmployeePayslip();
            p.EmployeeId=employeeId;
            p.PdfContent = file.FileName;
           await _context.Payslips.AddAsync(p);
           await _context.SaveChangesAsync();

            return Ok(new { filePath });
        }

        [HttpGet("{employeeId}")]
        public IActionResult GetPayslips(int employeeId)
        {
            var dirPath = Path.Combine(_env.ContentRootPath, "Payslips", employeeId.ToString());
            if (!Directory.Exists(dirPath))
                return NotFound("No payslips found for this employee.");

            var files = Directory.GetFiles(dirPath).Select(file => Path.GetFileName(file)).ToList();

            return Ok(files);
        }

        [HttpGet("{employeeId}/{fileName}")]
        public IActionResult DownloadPayslip(int employeeId, string fileName)
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Payslips", employeeId.ToString(), fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            var bytes = System.IO.File.ReadAllBytes(filePath);
            return File(bytes, "application/pdf", fileName);
        }

        [HttpDelete("{employeeId}/{fileName}")]
        public IActionResult DeletePayslip(int employeeId, string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("Filename is required.");

            var filePath = Path.Combine(_env.ContentRootPath, "Payslips", employeeId.ToString(), fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            try
            {
                System.IO.File.Delete(filePath);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return Ok(new { message = "File deleted successfully." });
        }

    }
}