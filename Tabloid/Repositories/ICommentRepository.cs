using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        List<Comment> GetAllCommentsOnPost(int id);
        Comment GetCommentById(int id);
        void Add(Comment comment, int currentUser);
        void Update(Comment comment);
        void Delete(int id);
    }
}