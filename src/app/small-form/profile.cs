using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.app.small-form
{
    public class profile
    {
    
    [Key]
    public int id { get; set; }
    public byte[] FileContent { get; set; }
    public string Tagline { get; set; }
    public string Description { get; set; }    
    }
}