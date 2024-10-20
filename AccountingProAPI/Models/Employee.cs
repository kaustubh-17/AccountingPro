using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingProAPI.Models
{
    public class Employee
    {
        [Key]
        public int emp_id { get; set; }
        public string emp_name { get; set; }
        public string emp_username { get; set; }
        public string emp_email { get; set; }
        public string emp_password { get; set; }
        public string emp_phone { get; set; }
        public string emp_gender { get; set; }
        public string emp_department { get; set; }
        public string emp_project { get; set; }
        public string emp_role { get; set; }
        public string emp_salary { get; set; }
        public string emp_doj { get; set; }
        public int emp_experience { get; set; }
        public bool emp_isAdmin { get; set; }
    }
}