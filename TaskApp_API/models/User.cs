using System.Collections.Generic;

namespace TaskApp_API.models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}