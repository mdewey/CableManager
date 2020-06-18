using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CableManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CableManager.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SearchController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public SearchController(DatabaseContext context)
    {
      _context = context;
    }


    [HttpGet("cables")]
    public async Task<ActionResult> SearchForCables([FromQuery] string searchTerm)
    {
      searchTerm = searchTerm.ToLower();
      var results = _context.Cables.Where(w =>
      w.EndOne.Contains(searchTerm) ||
      w.EndTwo.Contains(searchTerm) ||
      w.Note.Contains(searchTerm) ||
      w.Location.Contains(searchTerm));

      return Ok(new { results = results.OrderBy(o => o.Location) });
    }
  }
}