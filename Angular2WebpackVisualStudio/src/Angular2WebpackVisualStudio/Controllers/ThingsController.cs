using System.Linq;
using Angular2WebpackVisualStudio.Models;
using Angular2WebpackVisualStudio.Repositories.Things;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Angular2WebpackVisualStudio.Controller
{
    [Route("api/[controller]")]
    public class ThingsController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly IThingsRepository _thingsRepository;

        public ThingsController(IThingsRepository thingsRepository)
        {
            _thingsRepository = thingsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_thingsRepository.GetAll().Select(x => Mapper.Map<ThingDto>(x)));
        }

        [HttpPost]
        public IActionResult Add([FromBody] ThingDto thingDto)
        {
            if (thingDto == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing newThing = _thingsRepository.Add(Mapper.Map<Thing>(thingDto));

            return CreatedAtRoute("GetSingleThing", new { id = newThing.Id }, Mapper.Map<ThingDto>(newThing));
        }

        [HttpPatch("{id:int}")]
        public IActionResult PartiallyUpdate(int id, [FromBody] JsonPatchDocument<ThingDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            Thing existingEntity = _thingsRepository.GetSingle(id);

            if (existingEntity == null)
            {
                return NotFound();
            }

            ThingDto thingDto = Mapper.Map<ThingDto>(existingEntity);
            patchDoc.ApplyTo(thingDto, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing updated = _thingsRepository.Update(id, Mapper.Map<Thing>(thingDto));

            return Ok(Mapper.Map<ThingDto>(updated));
        }

        [HttpGet]
        [Route("{id:int}", Name = "GetSingleThing")]
        public IActionResult Single(int id)
        {
            Thing thing = _thingsRepository.GetSingle(id);

            if (thing == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<ThingDto>(thing));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            Thing thing = _thingsRepository.GetSingle(id);

            if (thing == null)
            {
                return NotFound();
            }

            _thingsRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]ThingDto thing)
        {
            var thingToCheck = _thingsRepository.GetSingle(id);

            if (thingToCheck == null)
            {
                return NotFound();
            }

            if (id != thing.Id)
            {
                return BadRequest("Ids do not match");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing update = _thingsRepository.Update(id, Mapper.Map<Thing>(thing));

            return Ok(Mapper.Map<ThingDto>(update));
        }
    }
}
