using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAll());
        }


        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            // NOTE: This is only temporary to set the UserProfileId until we implement login
            // TODO: After we implement login, use the id of the current user
            comment.UserProfileId = 1;

            comment.DateCreated = DateTime.Now;
            if (string.IsNullOrWhiteSpace(comment.Description))
            {
                comment.Description = null;
            }

            try
            {
                // Handle the comment URL

                // A valid comment link might look like this:
                //  https://www.youtube.com/watch?v=sstOXCQ-EG0&list=PLdo4fOcmZ0oVGRpRwbMhUA0KAvMA2mLyN
                // 
                // Our job is to pull out the "v=XXXXX" part to get the get the "code/id" of the comment
                //  So we can construct an URL that's appropriate for embedding a comment

                // An embeddable Comment URL looks something like this:
                //  https://www.youtube.com/embed/sstOXCQ-EG0

                // If this isn't a YouTube comment, we should just give up
                if (!comment.Url.Contains("youtube"))
                {
                    return BadRequest();
                }

                // If it's not already an embeddable URL, we have some work to do
                if (!comment.Url.Contains("embed"))
                {
                    var commentCode = comment.Url.Split("v=")[1].Split("&")[0];
                    comment.Url = $"https://www.youtube.com/embed/{commentCode}";
                }
            }
            catch // Something went wrong while creating the embeddable url
            {
                return BadRequest();
            }

            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }


        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        [Authorize]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_commentRepository.Search(q, sortDesc));
        }

        [HttpGet("hottest")]
        [Authorize]
        public IActionResult SearchByDate(DateTime since)
        {
            return Ok(_commentRepository.SearchByDate(since));
        }

    }
}