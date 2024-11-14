package com.core.backend.auth;


import com.core.backend.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserMapper userMapper = UserMapper.INSTANCE;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public void register(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        if (userDTO.getRole() == null) {
            userDTO.setRole(Role.USER);
        }
        User user = userMapper.toUserEntity(userDTO);
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String authenticate(UserDTO userDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getEmail(),
                        userDTO.getPassword()
                )
        );

        User user = userRepository.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("USER: " + user.getEmail());
        String token = jwtService.generateToken(user);
        return token;
    }

    public User getUserByToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null && !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return userRepository
                .findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
