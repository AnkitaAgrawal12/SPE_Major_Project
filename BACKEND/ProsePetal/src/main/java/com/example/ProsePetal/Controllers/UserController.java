package com.example.ProsePetal.Controllers;

import com.example.ProsePetal.Payloads.PostDTO;
import com.example.ProsePetal.Payloads.UserDTO;
import com.example.ProsePetal.Services.PostService;
import com.example.ProsePetal.Services.UserService;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@NoArgsConstructor
public class UserController {
    private PostService postService;
    private UserService userService;

    @GetMapping("/viewProfile/{userId}")
    public ResponseEntity<UserDTO> profiledetails(@PathVariable("userId") Integer userId)
    {
        UserDTO user = (UserDTO) userService.getprofiledetails(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
