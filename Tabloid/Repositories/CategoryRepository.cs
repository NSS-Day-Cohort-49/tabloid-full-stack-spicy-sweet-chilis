using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Tabloid.Models;
using Microsoft.Extensions.Configuration;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository :BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }
        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name
                                      FROM Category
                                      ORDER BY name";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Category> categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader,"Name"),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }
    }
}
