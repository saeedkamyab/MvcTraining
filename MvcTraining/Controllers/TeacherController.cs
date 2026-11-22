using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcTraining.Data;
using MvcTraining.Models;

namespace MvcTraining.Controllers
{
    public class TeacherController : Controller
    {
        private readonly AppDbContext _context;

        public TeacherController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }
        public async Task<IActionResult> GetTeachers()
        {
            var teachers = await _context.Teachers.ToListAsync();

            return Json(teachers);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Teacher teacher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Teachers.Add(teacher);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "معلم با موفقیت اضافه شد",
                teacher
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
                return NotFound();

            return Ok(teacher);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Teacher teacher)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingTeacher = await _context.Teachers.FindAsync(teacher.Id);

            if (existingTeacher == null)
                return NotFound();

            existingTeacher.FirstName = teacher.FirstName;
            existingTeacher.LastName = teacher.LastName;
            existingTeacher.NationalCode = teacher.NationalCode;
            existingTeacher.Age = teacher.Age;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "اطلاعات معلم با موفقیت ویرایش شد"
            });
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);

            if (teacher == null)
                return NotFound();

            _context.Teachers.Remove(teacher);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "معلم با موفقیت حذف شد"
            });
        }

    }
}
