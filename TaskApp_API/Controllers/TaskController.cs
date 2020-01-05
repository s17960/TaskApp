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

        [HttpPut("done/{id}")]
        public async Task<IActionResult> SetTaskDone(int id)
        {
            var doneTask = _context.Tasks.FirstOrDefault(x => x.Id == id);
            doneTask.IsDone = true;

            if(doneTask == null)
                return NotFound();
            
            _context.Tasks.Attach(doneTask);
            _context.Entry(doneTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

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
        [HttpPost("{taskText}")]
        public async Task<IActionResult> AddTask(string taskText)
        {
            var newTask = new models.Task(){
                TaskText = taskText,
                IsDone = false
            };

            await _context.Tasks.AddAsync(newTask);
            _context.SaveChanges();

            return StatusCode(201, newTask);
        }

        // PUT api/task/5
        [HttpPut("{id}/{taskText}")]
        public async Task<IActionResult> UpdateTask(int id, string taskText)
        {
            var updatedTask = _context.Tasks.FirstOrDefault(x => x.Id == id);

            if(updatedTask == null)
                return NotFound();

            updatedTask.TaskText = taskText;

            _context.Tasks.Attach(updatedTask);
            _context.Entry(updatedTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(updatedTask);
            
        }

        [HttpPut("alldone")]
        public async Task<IActionResult> SetAllDone(){
            var toDoTasks = _context.Tasks.Where(x => x.IsDone == false).ToList();
            toDoTasks.ForEach(x => x.IsDone = true);
            await _context.SaveChangesAsync();

            return Ok();
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