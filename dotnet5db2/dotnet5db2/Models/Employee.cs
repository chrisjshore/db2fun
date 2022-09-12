using Microsoft.EntityFrameworkCore;

namespace dotnet5db2
{
    [Keyless]
    public class Employee
    {
        public string EmpNo { get; set; } = "";
        public string FirstNme { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Sex { get; set; } = "";
        public string WorkDept { get; set; } = "";
        public string Job { get; set; } = "";
        public decimal Salary { get; set; } = 0;
    }
}
