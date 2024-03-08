import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { postSchema, updatedPostSchema } from "@saurabh412/index";


export const postRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string 
        password:string
    },
    Variables:{
        userId : number
    }
}>()

postRouter.use('/post/*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return c.json({ message: 'Unauthorized' }, 401);
    }
    try {
        const user = await verify(authHeader, c.env.password);
        // console.log(user)
        // console.log(user.id)
        if (!user) {
            return c.json({ message: 'Invalid  token' }, 403)
        } else {
            c.set("userId", user.id)
            await next();
        }
    } catch (e) {
        console.log(e)
        return c.text(`${e}, Unauthorized`, 401)
    }
})

postRouter.post('/post/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const userId = c.get('userId');
      const body = await c.req.json();
      const {success} = postSchema.safeParse(body);
      if(!success){
      c.json("invalid inputs")
      }

      // Input Validation
      if (!body.title || !body.content) {
        return c.json({ message: 'Title and content are required' }, 400);
      }
  
      // Create the post with Prisma
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          published:true,
          authorId: userId
        }
      });
  
      return c.json(post, 201); // 201 Created status code
    } catch (error) {
      console.error("Error creating post:", error);
      return c.json({ message: 'Error creating post' }, 400); 
    }
  });

  postRouter.put('/post/update/:id', async (c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const {success} = updatedPostSchema.safeParse(body);
    if(!success){
     return c.json("invalid inputs")
    }
    const userId =  c.get('userId')
    const id = parseInt(c.req.param('id'));
    console.log(id)
    // Check that the ID is valid
    const post = await prisma.post.findUnique({
      where:{id,authorId:userId}
    })
    if (!post) {
      return c.json({ message: 'Unauthorized' }, 401)
    }
    try{
      const updatedPost = await prisma.post.update({
        where : {id},
        data:{
            title: body.title,
            content: body.content
        }
      })
      return c.json({msg:"Updated successfully"}),c.json(updatedPost)
    }catch(e){
      console.error("Error updating post:", e);
      return c.json("you are not authenticated:",401)
    }
    })

    postRouter.get('/post/bulk', async(c) =>{
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      
      const post = await prisma.post.findMany({
        select:{
          id:true,
          title:true,
          content:true,
          author:{select:{
            name:true,
          }}
          }
      })
      return c.json(post)
    })
  
postRouter.get('/post/posts', async(c) => {
  const userId =  c.get('userId')
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findMany({
		where: {
			 authorId:userId
		},select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
    }
	});
  return c.json(post)
})

postRouter.get('/post/:id', async(c) => {
  const userId =  c.get('userId')
  const id = parseInt(c.req.param('id'));
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	try{
	const post = await prisma.post.findUnique({
		where: {
			 id, authorId:userId 
		} , select:{
      id:true,
      title:true,
      content:true,
      author:{select:{
        name:true,
      }}
      }
	})
  return c.json(post)
}catch(e){
  return  c.text("Not found")
}
})

//delete your post
postRouter.delete('/post/delete/:id',async(c)=>{
  const userId =  c.get('userId')
  const id = parseInt(c.req.param('id'));
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  try {

    const post = await prisma.post.findUnique({
      where: { id, authorId: userId },
    })
    console.log(post)

    if (!post) {

      return c.text('Post not found', 404)
    }

    await prisma.post.delete({
      where: {
        id
      },
    })


    return c.text('Post deleted successfully', 200)
  } catch (error) {
    console.error('Error deleting post:', error)
    return c.json({ message: 'Error deleting post' }, 500)
  }
})