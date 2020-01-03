namespace TaskApp_API.models
{
    public class Task
    {
        public int Id { get; set; }
        public string TaskText { get; set; }
        public bool IsDone { get; set; }
    }
}