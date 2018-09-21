using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using TypeScript_AngularJS_Gulp_Bower.App_Start;
using TypeScript_AngularJS_Gulp_Bower.Models;

namespace TypeScript_AngularJS_Gulp_Bower.Controllers
{
    public class PostsController : ApiController
    {
        public IHttpActionResult Get()
        {
            var posts = DataRepository.Posts;
            return Ok(posts);
        }

        public IHttpActionResult Get(int id)
        {
            var post = DataRepository.Posts.FirstOrDefault(p => p.Id == id);

            if (post!=null)
            {
                return Ok(post);
            }
            else
            {
                return NotFound();
            }
        }

        public IHttpActionResult Post([FromBody]Post post)
        {
            var max = DataRepository.Posts.Max(p => p.Id);
            post.Id = max + 1;

            DataRepository.Posts.Add(post);
            return Ok(post);
        }

        public IHttpActionResult Put(int id, [FromBody]Post post)
        {
            Post pst = DataRepository.Posts.FirstOrDefault(p => p.Id == post.Id);

            if (pst != null)
            {
                for (int i = 0; i < DataRepository.Posts.Count; i++)
                {
                    if (DataRepository.Posts[i].Id == id)
                    {
                        DataRepository.Posts[i] = post;
                        return Ok();
                    }
                }
            }

            return NotFound();
        }

        public IHttpActionResult Delete(int id)
        {
            if (DataRepository.Posts.Any(p => p.Id == id))
            {
                Post pst = DataRepository.Posts.First(p => p.Id == id);
                DataRepository.Posts.Remove(pst);
                return Ok();
            }

            return NotFound();
        }
    }
}