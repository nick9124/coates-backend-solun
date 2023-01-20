import { Request, Response, NextFunction } from 'express';
// import axios, { AxiosResponse } from 'axios';
import fs from 'fs';

interface User {
  id: number;
  name: string;
  email: string;
  dob: string;
}

// getting all users
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading users file',
        error: err,
      });
    }
    let users: [User] = JSON.parse(data);
    return res.status(200).json({
      message: users,
    });
  });
};

// getting a single user
const getUser = (req: Request, res: Response, next: NextFunction) => {
  // get the user id from the req
  let id = req.params.id;
  fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading users file',
        error: err,
      });
    }
    let users: [User] = JSON.parse(data);
    let id: number = parseInt(req.params.id);
    let user = users.filter((user: User) => user.id == id);
    return res.status(200).json({
      message: user,
    });
  });
};

// updating a user
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  // get the user id from the req.params
  let id = req.params.id;
  // get the data from req.body
  let name = req.body.name ?? null;
  let email = req.body.email ?? null;
  let dob = req.body.dob ?? null;
  fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading users file',
        error: err,
      });
    }
    let users: User[] = JSON.parse(data);
    let id: number = parseInt(req.params.id);
    users = users.map((user: User) =>
      user.id == id
        ? {
            ...user,
            ...(name && { name }),
            ...(email && { email }),
            ...(dob && { dob }),
          }
        : user
    );
    fs.writeFile(
      `${__dirname}/../data/users.json`,
      JSON.stringify(users),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error updating user',
            error: err,
          });
        }
        return res.status(200).json({
          message: `user with id: ${id} is updated`,
        });
      }
    );
  });
};

// deleting a user
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  // get the user id from req.params
  let id = req.params.id;
  fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading users file',
        error: err,
      });
    }
    let users: User[] = JSON.parse(data);
    let id: number = parseInt(req.params.id);
    users = users.filter((user: User) => user.id != id);
    fs.writeFile(
      `${__dirname}/../data/users.json`,
      JSON.stringify(users),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error deleting user',
            error: err,
          });
        }
        return res.status(200).json({
          message: `user with id: ${id} is deleted`,
        });
      }
    );
  });
};

// adding a user
const addUser = (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let name = req.body.name;
  let email = req.body.email;
  let dob = req.body.dob;
  fs.readFile(`${__dirname}/../data/users.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading users file',
        error: err,
      });
    }
    let users: [User] = JSON.parse(data);
    let newId = users.length + 1;
    users.push({
      id: newId,
      name,
      email,
      dob,
    });
    fs.writeFile(
      `${__dirname}/../data/users.json`,
      JSON.stringify(users),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error adding user',
            error: err,
          });
        }
        return res.status(200).json({
          message: `user added successfully`,
        });
      }
    );
  });
};

// interface Post {
//   userId: Number;
//   id: Number;
//   title: String;
//   body: String;
// }

// // getting all posts
// const getPosts = async (req: Request, res: Response, next: NextFunction) => {
//   // get some posts
//   let result: AxiosResponse = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts`
//   );
//   let posts: [Post] = result.data;
//   return res.status(200).json({
//     message: posts,
//   });
// };

// // getting a single post
// const getPost = async (req: Request, res: Response, next: NextFunction) => {
//   // get the post id from the req
//   let id: string = req.params.id;
//   // get the post
//   let result: AxiosResponse = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   let post: Post = result.data;
//   return res.status(200).json({
//     message: post,
//   });
// };

// // updating a post
// const updatePost = async (req: Request, res: Response, next: NextFunction) => {
//   // get the post id from the req.params
//   let id: string = req.params.id;
//   // get the data from req.body
//   let title: string = req.body.title ?? null;
//   let body: string = req.body.body ?? null;
//   // update the post
//   let response: AxiosResponse = await axios.put(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//     {
//       ...(title && { title }),
//       ...(body && { body }),
//     }
//   );
//   // return response
//   return res.status(200).json({
//     message: response.data,
//   });
// };

// // deleting a post
// const deletePost = async (req: Request, res: Response, next: NextFunction) => {
//   // get the post id from req.params
//   let id: string = req.params.id;
//   // delete the post
//   let response: AxiosResponse = await axios.delete(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   // return response
//   return res.status(200).json({
//     message: 'post deleted successfully',
//   });
// };

// // adding a post
// const addPost = async (req: Request, res: Response, next: NextFunction) => {
//   // get the data from req.body
//   let title: string = req.body.title;
//   let body: string = req.body.body;
//   // add the post
//   let response: AxiosResponse = await axios.post(
//     `https://jsonplaceholder.typicode.com/posts`,
//     {
//       title,
//       body,
//     }
//   );
//   // return response
//   return res.status(200).json({
//     message: response.data,
//   });
// };

export default { getUsers, getUser, updateUser, deleteUser, addUser };
