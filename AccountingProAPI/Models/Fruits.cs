using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingProAPI.Models
{
    public class Fruits
    {
        [Key]
        public int id { get; set; }
        public string fruit { get; set; }

    }
}