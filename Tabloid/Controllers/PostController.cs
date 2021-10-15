using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAllPosts();

            return Ok(posts);
        }

        [HttpGet("myPost")]
        public IActionResult MyIndex()
        {
            var currentUserProfile = GetCurrentUserProfile();

            var myPosts = _postRepository.GetAllPostsByUser(currentUserProfile.Id);

            return Ok(myPosts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();

            _postRepository.Add(post, currentUserProfile.Id);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (id != post.Id && currentUserProfile.Id != post.UserProfileId)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }


        [HttpDelete("delete/{postId}")]
        public IActionResult Delete(int postId)
        {
            _postRepository.Delete(postId);
            return NoContent();
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
    }

}
