import { Context, Hono, Next } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import { signinSchema, signupSchema, updatedUserSchema } from "@saurabh412/index";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string 
        password:string
    },
    Variables : {
      userId : string
    }
}>();

async function authMiddleware(c:Context,next:Next) {
  try {
    const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json("Unauthorised Access",401)
  }
  const user = await verify(authHeader, c.env.password);
    if(!user){
        return c.json({message:'Invalid  token'},403)
    }
    c.set("userId",user.id)

   return await next();

  } catch (error) {

    console.error("Authentication error:", error);
    return c.json({ message: "Internal Server Error" }, 500);

  }
}

userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const body = await c.req.json();
   const {success} = signupSchema.safeParse(body);
   if(!success){
     c.json("invalid inputs")
   }
   const user = await prisma.user.create({
      data:{
        name : body.name,
        email:body.email,
        password:body.password
      }
    });
   try{
    const jwt = await sign({id:user.id},c.env.password);
    return c.json({jwt},201)
   }catch(e){
    return c.json({error:'Failed to create token'},403);
   }
  });

  userRouter.get('/profile',authMiddleware, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = parseInt(c.get('userId'));
    const userProfile = await prisma.user.findUnique({
      where:{
        id:userId
      }
    })
    return c.json(userProfile)
  })

  userRouter.get('/profiles',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const users = await prisma.user.findMany({
      select:{
        id:true,
        name:true,
        email:true,
    }})
    return c.json(users)
  })

  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body  = await c.req.json();
    const {success} = signinSchema.safeParse(body);
    if(!success){
      c.json("invalid inputs")
    }
    const user = await prisma.user.findUnique({where:{email:body.email}});
    if (!user) {
      return c.json({Unauthorized: "wrong email"},401);
    }
    const  isValid = await prisma.user.findFirst({where:{password:body.password}})
    if(!isValid) {  
      return c.json({Unauthorized: "Wrong password"},400)
    }
  
    const jwt=await sign({id:user.id},c.env.password)
    return c.json({jwt,user},200)
  })

  userRouter.put('/update/:id',authMiddleware,async (c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();
      const {success} = updatedUserSchema.safeParse(body);
       if(!success){
        return c.json("invalid inputs")
       }

      const userId = parseInt(c.get('userId'));
      const id = parseInt(c.req.param('id'))
      console.log(userId);
      console.log(id);
      if (userId !== id) {
        return c.json({ message: "Unauthorized" }, 403);
      }
      try{
        const updatedUser = await prisma.user.update({
          where: {
            id:userId
          },
          data:{
            email : body.email,
            password: body.password,
            name: body.name,
          }
        })
        return c.json({msg:"Updated successfully"},500),c.json(updatedUser)
      } catch (e){
        return c.json('Server error')
      }
    });

    userRouter.delete("/delete/:id",authMiddleware , async (c)=>{
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const userId = parseInt(c.get('userId'))
      console.log(userId)
      const user = await prisma.user.findUnique(
        {where:{id:userId}
      })
      console.log(user)
      if (!user) {
        return c.json("No User Found with this ID")
      }
      await prisma.user.delete({where:{id:userId}})
      return c.json('user deleted')
    })