package com.example.ProsePetal.Services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    Object getprofiledetails(Integer userId);
}
