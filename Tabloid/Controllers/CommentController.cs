using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Tabloid.Repositories;
using System.Security.Claims;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }


        [HttpGet("getCommentsByPostId/{id}")]
        //[Authorize]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetAllCommentsOnPost(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpGet("{id}")]
        //[Authorize]
        public IActionResult GetById(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();

            _commentRepository.Add(comment, currentUser.Id);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (firebaseUserId != null)
            {
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
            else
            {
                return null;
            }
        }


        //[HttpPut("{id}")]
        //[Authorize]
        //public IActionResult Put(int id, Comment comment)
        //{
        //    if (id != comment.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _commentRepository.Update(comment);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //[Authorize]
        //public IActionResult Delete(int id)
        //{
        //    _commentRepository.Delete(id);
        //    return NoContent();
        //}

        //[HttpGet("search")]
        //[Authorize]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_commentRepository.Search(q, sortDesc));
        //}


    }
}