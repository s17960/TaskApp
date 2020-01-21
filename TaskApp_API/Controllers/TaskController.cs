using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApp_API.Data;
using TaskApp_API.models;

namespace TaskApp_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskController(DataContext context)
        {
            _context = context;
        }

        public bool IsUserAuthenticated(int userId)
        {

            return userId == int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetTasks(int userId)
        {
            if (!IsUserAuthenticated(userId))
            {
                return BadRequest();
            }

            var tasks = await _context.Tasks.Where(x => x.User.Id == userId).ToListAsync();
            return Ok(tasks);
        }

        [HttpPut("done/{id}")]
        public async Task<IActionResult> SetTaskDone(int id)
        {
            var doneTask = _context.Tasks.FirstOrDefault(x => x.Id == id);
            doneTask.IsDone = true;

            if (doneTask == null)
                return NotFound();

            _context.Tasks.Attach(doneTask);
            _context.Entry(doneTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var tasks = await _context.Tasks.Where(x => x.IsDone == false).ToListAsync();
            return Ok(tasks);
        }

        // POST api/task
        [HttpPost("{userId:int}/{taskText}")]
        public async Task<IActionResult> AddTask(int userId, string taskText)
        {
            if (!IsUserAuthenticated(userId))
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var newTask = new models.Task()
            {
                TaskText = taskText,
                IsDone = false,
                User = user
            };

            await _context.Tasks.AddAsync(newTask);
            _context.SaveChanges();

            var toDoTasks = await _context.Tasks.Where(x => x.IsDone == false && x.User.Id == userId).ToListAsync();

            return StatusCode(201, toDoTasks);
        }

        // PUT api/task/5
        [HttpPut("{taskId:int}/{taskText}")]
        public async Task<IActionResult> UpdateTask(int taskId, string taskText)
        {

            var updatedTask = _context.Tasks.FirstOrDefault(x => x.Id == taskId);

            if (updatedTask == null)
                return NotFound();

            updatedTask.TaskText = taskText;

            _context.Tasks.Attach(updatedTask);
            _context.Entry(updatedTask).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(updatedTask);
        }

        [HttpPut("alldone/{userId}")]
        public async Task<IActionResult> SetAllDone(int userId)
        {
            if (!IsUserAuthenticated(userId))
            {
                return BadRequest();
            }
            var toDoTasks = _context.Tasks.Where(x => x.IsDone == false && x.User.Id == userId).ToList();
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

        [HttpDelete("isdone/{userId:int}/{isDone:bool}")]
        public async Task<IActionResult> DeleteTasks(int userId, bool IsDone)
        {
            _context.Tasks.RemoveRange(_context.Tasks.Where(x => x.IsDone == IsDone && x.User.Id == userId));
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}