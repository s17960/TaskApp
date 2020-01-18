using System.ComponentModel.DataAnnotations;

namespace TaskApp_API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Podaj haslo, które ma od 4 do 8 znaków")]
        public string Password { get; set; }
    }
}