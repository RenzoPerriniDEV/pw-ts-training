import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";


const BASE_URL = "https://jsonplaceholder.typicode.com";

test("GET - should get a post", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/posts/1`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.id).toBe(1);
});

test("POST - should create a post", async ({ request }) => {
  const response = await request.post(`${BASE_URL}/posts`, {
    data: {
      title: "My post",
      body: "Hello world",
      userId: 1
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  console.log(body);

  expect(body.title).toBe("My post");
});


test("POST - should create post using external JSON file", async ({ request }) => {
  
  // Build path to JSON file
  const filePath = path.join(__dirname, "..", "test-data", "post-data.json");

  // Read JSON file
  const requestBody = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Send POST
  const response = await request.post(`${BASE_URL}/posts`, {
    data: requestBody
  });

  // Assertions
  expect(response.status()).toBe(201);

  const body = await response.json();
  console.log(body);

  expect(body.title).toBe(requestBody.title);
  expect(body.body).toBe(requestBody.body);
  expect(body.userId).toBe(requestBody.userId);
});


test("PUT - should update a post", async ({ request }) => {
  const response = await request.put(`${BASE_URL}/posts/1`, {
    data: {
      id: 1,
      title: "Updated title",
      body: "Updated body",
      userId: 1
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.title).toBe("Updated title");
});
