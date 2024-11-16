package com.core.backend.user;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.auth.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthService authService;
    private final AuthRepository authRepository;

    public User getMe() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}
