package com.example.ProsePetal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.example.ProsePetal.Entity.Post;
import com.example.ProsePetal.Entity.User;
import com.example.ProsePetal.Services.PostService;
import com.example.ProsePetal.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProsePetalApplicationTests {

	@Mock
	private UserService userService;

	@InjectMocks
	private PostService postService;

	@BeforeEach
	public void setUp() {
		when(userService.getUserById(anyLong())).thenAnswer(invocation -> {
			Integer userId = invocation.getArgument(0);
			return new User(userId);
		});
	}

	@Test
	public void testCreatePost() {

	}
}
