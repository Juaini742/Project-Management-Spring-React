package com.core.backend.auth;


import com.core.backend.profile.Profile;
import com.core.backend.profile.ProfileRepository;
import com.core.backend.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthRepository authRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;

    public void register(UserDTO userDTO) {
        if (authRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        User userMap = User.builder()
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();

        if (userMap.getRole() == null) {
            userMap.setRole(Role.USER);
        }
        authRepository.save(userMap);

        Profile profile = Profile.builder().user(userMap).build();
        profileRepository.save(profile);
    }

    public String authenticate(UserDTO userDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getEmail(),
                        userDTO.getPassword()
                )
        );

        User user = authRepository.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return jwtService.generateToken(user);

    }

    public User getUserByToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null && !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        return authRepository
                .findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String getEmailToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null && !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        return auth.getName(); // -> email

        // decode -> header -> signature -> payload -> secret
    }
}
