using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingProAPI.Models
{
    public class Feedback
    {
        [Key]
        public int id { get; set; }
        public int empid { get; set; } 
        public string feedback { get; set; }
        
    }
}