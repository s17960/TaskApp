using System.ComponentModel.DataAnnotations;

namespace TaskApp_API.models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string TaskText { get; set; }
        public bool IsDone { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}