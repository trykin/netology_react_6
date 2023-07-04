using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace netology_react_6.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private INotes _notes;

        private readonly ILogger<NotesController> _logger;

        public NotesController(ILogger<NotesController> logger, INotes notes)
        {
            _logger = logger;
            _notes = notes;
        }

        [HttpGet]
        public ActionResult<List<NoteData>> Get()
        {
            return Ok(_notes.GetAllNotes());
        }

        [HttpGet("{Id}")]
        public ActionResult<NoteData> Get(Guid Id)
        {
            return Ok(_notes.GetNote(Id));
        }

        [HttpPost]
        public ActionResult<NoteData> Post(NotePost request)
        {
            return Ok(_notes.AddNote(request));
        }

        [HttpPut]
        public ActionResult<NoteData> Put(NoteData request)
        {
            return Ok(_notes.PutNote(request));
        }

        [HttpDelete]
        public ActionResult<List<NoteData>> Delete(NoteDelete request)
        {
            _notes.DeleteNote(request);
            return Ok();
        }
    }

    public class NoteDelete
    {
        [Required]
        public Guid? Id { get; set; }
    }

    public class NotePost
    {
        [Required]
        public string Content { get; set; }
    }

    public class NoteData
    {
        [Required]
        public Guid? Id { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
