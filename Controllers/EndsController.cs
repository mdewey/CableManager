using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CableManager.Models;

namespace CableManager.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AutoCompleteController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public AutoCompleteController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Ends
    [HttpGet("ends")]
    public async Task<ActionResult> GetAllTypes()
    {
      var lefts = await _context.Cables.Select(s => s.EndOne).Where(w => !String.IsNullOrWhiteSpace(w)).ToListAsync();
      var rights = await _context.Cables.Select(s => s.EndTwo).Where(w => !String.IsNullOrWhiteSpace(w)).ToListAsync();

      var all = new List<string>();
      all.AddRange(lefts);
      all.AddRange(rights);

      return Ok(new { Ends = all.Distinct().OrderBy(o => o) });
    }

    // GET: api/Ends
    [HttpGet("locations")]
    public async Task<ActionResult> Getlocations()
    {
      var locations = await _context.Cables.Select(s => s.Location).Where(w => !String.IsNullOrWhiteSpace(w)).ToListAsync();

      return Ok(new { Locations = locations.Distinct().OrderBy(o => o) });
    }

    // GET: api/Ends
    [HttpGet("notes")]
    public async Task<ActionResult> GetNotes()
    {
      var notes = await _context.Cables.Select(s => s.Note).Where(w => !String.IsNullOrWhiteSpace(w)).ToListAsync();

      return Ok(new { Notes = notes.Distinct().OrderBy(o => o) });
    }


  }
}
