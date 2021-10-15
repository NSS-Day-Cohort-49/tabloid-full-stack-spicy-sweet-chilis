using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Microsoft.Data.SqlClient;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.*, u.DisplayName AS Poster, c.Name AS CategoryName
                                        FROM Post p
                                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                                        LEFT JOIN Category c ON p.CategoryId = c.Id
                                        WHERE p.IsApproved = 1 AND p.PublishDateTime < SYSDATETIME()
                                        ORDER BY p.PublishDateTime DESC";

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile
                            {
                                DisplayName = DbUtils.GetString(reader, "Poster")
                            }
                        });
                    }

                    reader.Close();
                    return posts;
                }
            }
        }

        public List<Post> GetAllPostsByUser(int currentUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.*, u.DisplayName AS Poster, c.Name AS CategoryName
                                        FROM Post p
                                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                                        LEFT JOIN Category c ON p.CategoryId = c.Id
                                        WHERE UserProfileId = @id
                                        ORDER BY p.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", currentUserId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile
                            {
                                DisplayName = DbUtils.GetString(reader, "Poster")
                            }
                        });
                    }

                    reader.Close();
                    return posts;
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime AS PostCreateDateTime, p.PublishDateTime AS PostPublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,

                              c.[Name] AS CategoryName,

                              u.FirstName, u.LastName, u.DisplayName AS Poster, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 

                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                              AND p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PostPublishDateTime"),
                            IsApproved = DbUtils.IsDbNull(reader, "IsApproved"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                            },
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile
                            {
                                DisplayName = DbUtils.GetString(reader, "Poster")
                            }
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public void Add(Post post, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post SET
                                      Title = @title,
                                      Content = @content,
                                      ImageLocation = @imageLocation,
                                      CreateDateTime = @createDateTime,
                                      PublishDateTime = @publishDateTime,
                                      IsApproved = @isApproved,
                                      CategoryId = @categoryId
                                      WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", post.Id);
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}