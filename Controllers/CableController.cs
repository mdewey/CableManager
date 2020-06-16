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
  public class CableController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public CableController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Cable
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cable>>> GetCables()
    {
      return await _context.Cables.ToListAsync();
    }

    // GET: api/Cable
    [HttpGet("count")]
    public async Task<ActionResult> GetCount()
    {

      return Ok(new { count = await _context.Cables.CountAsync() });
    }

    // GET: api/Cable/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Cable>> GetCable(int id)
    {
      var cable = await _context.Cables.FindAsync(id);

      if (cable == null)
      {
        return NotFound();
      }

      return cable;
    }

    // PUT: api/Cable/5
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCable(int id, Cable cable)
    {
      if (id != cable.Id)
      {
        return BadRequest();
      }

      _context.Entry(cable).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CableExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Cable
    // To protect from overposting attacks, please enable the specific properties you want to bind to, for
    // more details see https://aka.ms/RazorPagesCRUD.
    [HttpPost]
    public async Task<ActionResult> PostCable(Cable cable)
    {
      _context.Cables.Add(cable);
      await _context.SaveChangesAsync();

      return Ok(new { cable, Total = await _context.Cables.CountAsync() });
    }

    // DELETE: api/Cable/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Cable>> DeleteCable(int id)
    {
      var cable = await _context.Cables.FindAsync(id);
      if (cable == null)
      {
        return NotFound();
      }

      _context.Cables.Remove(cable);
      await _context.SaveChangesAsync();

      return cable;
    }

    private bool CableExists(int id)
    {
      return _context.Cables.Any(e => e.Id == id);
    }
  }
}
