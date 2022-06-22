const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", async function () {
  it("Should create a post", async function () {
    const Blog = await ethers.getContractFactory("Blog")
    const blog = await Blog.deploy("My blog")
    await blog.deployed()
    await blog.createPost("My first post", "leVi the beari & Sou the foux")
    
    const posts = await blog.fetchPosts()
    expect(posts[0].title).to.equal("My first post")
  })
  
  it("Should update post", async function () {
    const Blog = await ethers.getContractFactory("Blog")
    const blog = await Blog.deploy("My blog")
    await blog.deployed()
    await blog.createPost("My Second post", "leVi the beari & Sou the foux")
    
    await blog.updatePost(1, "My updated post", "leVi the beari & Sou the foux", true)
    
    posts = await blog.fetchPosts()
    expect(posts[0].title).to.equal("My updated post")
  })
  
  it("Should add update the name", async function () {
    const Blog = await ethers.getContractFactory("Blog")
    const blog = await Blog.deploy("My blog")
    await blog.deployed()
    
    expect(await blog.name()).to.equal("My blog")
    await blog.updateName('My new blog')
    expect(await blog.name()).to.equal("My new blog")
  })
})