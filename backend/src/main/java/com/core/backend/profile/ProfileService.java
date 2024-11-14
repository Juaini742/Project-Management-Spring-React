package com.core.backend.profile;


import com.core.backend.auth.AuthService;
import com.core.backend.user.User;
import com.core.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final AuthService authService;
    private final ProfileMapper profileMapper = ProfileMapper.INSTANCE;
    private final UserRepository userRepository;

    public void createProfile(ProfileDTO profileDTO) {
        User user = authService.getUserByToken();
        Profile profile = profileMapper.toProfileEntity(profileDTO);
        profile.setUser(user);
        profileRepository.save(profile);
    }

    public Profile getProfileUser(String id) {
        Profile profile = profileRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (userRepository.findById(profile.getUser().getId()).isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return profile;
    }

    public Profile update(String id, ProfileUpdateDTO profileUpdateDTO) {
        Profile existingProfile = profileRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        Profile profile = profileMapper.updateEntityFromDto(profileUpdateDTO, existingProfile);
        profileRepository.save(profile);
        return existingProfile;
    }

    public void delete(String id) {
        if (!profileRepository.existsById(id)) {
            throw new RuntimeException("Profile not found");
        }
        profileRepository.deleteById(id);
        profileRepository.flush();
    }
}
