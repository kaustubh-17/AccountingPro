using System;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Summary description for Class1
/// </summary>
public class EmployeePayslip
{
    [Key]
	public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string PdfContent { get; set; } // Example for storing PDF content as byte array
}

