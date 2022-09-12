using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace dotnet5db2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly Db2Context _context;
        public EmployeesController(Db2Context context)
        {
            _context = context;
        }
        
        // GET: api/<EmployeesController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _context.Employees.FromSqlInterpolated($"CALL GETALLEMPLOYEES").ToList();
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public IEnumerable<Employee> Get(int id)
        {
            return _context.Employees.FromSqlInterpolated($"CALL GETEMPLOYEEBYID({id})").ToList();
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
