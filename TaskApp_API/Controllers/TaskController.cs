using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApp_API.Data;
//using TaskApp-API.Models;

namespace TaskApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private DataContext _context { get; set; }

        public TaskController(DataContext context)
        {
            _context = context;
        }

        // GET api/task
        [HttpGet("")]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        // GET api/task/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks.Where(x => x.Id == id).ToListAsync();
            return Ok(task);
        }

        // POST api/task
        [HttpPost("")]
        public void Poststring(string value)
        {
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public void Putstring(int id, string value)
        {
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public void DeletestringById(int id)
        {
        }
    }
}