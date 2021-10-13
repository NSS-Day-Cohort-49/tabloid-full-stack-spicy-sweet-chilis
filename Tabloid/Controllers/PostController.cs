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

        [HttpGet("myPost/{firebaseUserId}")]
        public IActionResult MyIndex()
        {
            var currentUserProfile = GetCurrentUserProfileId();

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
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        private UserProfile GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}
