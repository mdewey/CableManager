using System;

namespace CableManager.Models
{
  public class Cable
  {
    public int Id { get; set; }
    public string EndOne { get; set; }
    public string EndTwo { get; set; }
    public string Location { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
  }
}