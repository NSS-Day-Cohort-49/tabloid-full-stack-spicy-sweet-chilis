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
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetAllComments()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Comment";

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PostId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        });
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        public List<Comment> GetAllCommentsOnPost(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select  c.Id AS CommentId, 
		                                        c.PostId,
		                                        c.UserProfileId,
		                                        c.[Subject],
		                                        c.Content,
		                                        c.CreateDateTime AS CommentCreateDT,
		                                        up.Id AS UserId,
		                                        up.DisplayName
                                        FROM Comment c
                                        JOIN UserProfile up ON up.Id = c.UserProfileId
                                        WHERE c.PostId = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(new Comment
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDT"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            }
                        });
                    }

                    reader.Close();
                    return comments;
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select  Id AS CommentId, 
		                                        PostId,
		                                        UserProfileId,
		                                        [Subject],
		                                        Content,
		                                        CreateDateTime AS CommentCreateDT,
                                        FROM Comment
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    Comment comment = null;

                    while (reader.Read())
                    {
                        comment = new Comment
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CommentCreateDT"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            
                        };
                    }

                    reader.Close();
                    return comment;
                }
            }
        }

        public void Add(Comment comment, int currentUser)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment ( PostId, 
					                                          UserProfileId,
					                                          [Subject],
					                                          Content,
					                                          CreateDateTime )
                                        OUTPUT INSERTED.ID
                                        VALUES			    ( @PostId,
					                                          @UserProfileId,
					                                          @[Subject],
					                                          @Content,
					                                          @CreateDateTime )";
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", currentUser);
                    cmd.Parameters.AddWithValue("@[Subject]", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();    
                }
            }
        }

        public void Update(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Comment SET
                                      Subject = @subject,
                                      Content = @content,
                                      CreateDateTime = @createDateTime
                                      WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", DbUtils.ValueOrDBNull(comment.CreateDateTime));

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
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
