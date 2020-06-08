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
  public class EndsController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public EndsController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Ends
    [HttpGet]
    public async Task<ActionResult> GetAllTypes()
    {
      var lefts = await _context.Cables.Select(s => s.EndOne).ToListAsync();
      var rights = await _context.Cables.Select(s => s.EndTwo).ToListAsync();

      var all = new List<string>();
      all.AddRange(lefts);
      all.AddRange(rights);

      return Ok(new { Ends = all.Distinct().OrderBy(o => o) });
    }


  }
}
