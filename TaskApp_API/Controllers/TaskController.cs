using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApp_API.Data;
using TaskApp_API.models;

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

        // GET api/task/done
        [HttpGet("done")]
        public async Task<IActionResult> GetDoneTasks()
        {
            var tasks = await _context.Tasks.Where(x => x.IsDone == true).ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("todo")]
        public async Task<IActionResult> GetToDoTasks()
        {
            var tasks = await _context.Tasks.Where(x => x.IsDone == false).ToListAsync();
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
        public async Task<IActionResult> AddTask(models.Task newTask)
        {
            await _context.Tasks.AddAsync(newTask);
            _context.SaveChanges();

            return StatusCode(201, newTask);
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, models.Task updatedTask)
        {
            if(await _context.Tasks.CountAsync(x => x.Id == id) == 0)
                return NotFound();
            
            _context.Tasks.Attach(updatedTask);
            _context.Entry(updatedTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(updatedTask);
            
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (task == null)
                return NotFound();
            
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return Ok(task);
        }

        [HttpDelete("isdone/{isDone}")]
        public async Task<IActionResult> DeleteTasks(bool IsDone)
        {
            _context.Tasks.RemoveRange(_context.Tasks.Where(x => x.IsDone == IsDone));
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}