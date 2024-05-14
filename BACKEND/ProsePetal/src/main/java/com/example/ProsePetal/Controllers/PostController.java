package com.example.ProsePetal.Controllers;

import com.example.ProsePetal.Exceptions.ResourceNotFoundException;
import com.example.ProsePetal.Payloads.PostDTO;
import com.example.ProsePetal.Repositories.UserRepo;
import com.example.ProsePetal.Services.JwtService;
import com.example.ProsePetal.Services.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtService jwtService;

    @PostMapping(path = "/user/create")
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO,
                                        HttpServletRequest request) {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid or missing Authorization header", HttpStatus.UNAUTHORIZED);
        }

        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

        try {
            String userEmail = jwtService.extractUsername(jwtToken);
            Integer extractedUserId = userRepo.findUserIdByEmail(userEmail);

            if (extractedUserId == null) {
                throw new ResourceNotFoundException("User", "email", extractedUserId);
            }
            PostDTO createdPost = postService.createPost(postDTO, extractedUserId);
            return new ResponseEntity<>(createdPost, HttpStatus.CREATED);

        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>("User not found for email: " + e.getFieldValue(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating post: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/user/{userId}/update/{postId}")
    public ResponseEntity<PostDTO> updatePost(@RequestBody PostDTO postDTO, @PathVariable("postId") Integer postId, @PathVariable("userId") Integer userId) {
        PostDTO updatedPost = postService.updatePost(postDTO, postId);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}/delete/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable("postId") Integer postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<PostDTO>> getAllPostsByUser(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Integer userId;
        String jwtToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
        try {
            String userEmail = jwtService.extractUsername(jwtToken);
            Integer extractedUserId = userRepo.findUserIdByEmail(userEmail);
            userId = extractedUserId;
            if (extractedUserId == null) {
                throw new ResourceNotFoundException("User", "email", extractedUserId);
            }
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }

        List<PostDTO> posts = postService.getPostsByUser(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/posts/{postId}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable("postId") Integer postId, @PathVariable("userId") Integer userId) {
        PostDTO post = postService.getPostById(postId).orElse(null);
        return new ResponseEntity<>(post, post != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}