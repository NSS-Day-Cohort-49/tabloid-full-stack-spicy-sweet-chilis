using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        List<Category> GetCategoryById(int id);
        void Add(Category category);
        void Update(Category category);
        void Delete(int categoryId);
    }
}
