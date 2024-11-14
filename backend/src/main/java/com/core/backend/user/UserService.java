package com.core.backend.user;


import com.core.backend.auth.AuthService;
import com.core.backend.auth.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserMapper userMapper = UserMapper.INSTANCE;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public User getMe() {
        return authService.getUserByToken();
    }


}
