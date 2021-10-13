using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> GetAllPostsByUser(int userId);
        Post GetPostById(int id);
    }
}