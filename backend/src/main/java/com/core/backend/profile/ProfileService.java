package com.core.backend.profile;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;


    public Profile update(String id, ProfileDTO profileDTO) {
        Profile existingProfile = profileRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        Profile profile = Profile.builder()
                .id(existingProfile.getId())
                .user(existingProfile.getUser())
                .full_name(profileDTO.getFull_name())
                .address(profileDTO.getAddress())
                .job(profileDTO.getJob())
                .profile_image(profileDTO.getProfile_image())
                .created_at(Timestamp.valueOf(LocalDateTime.now()))
                .updated_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        return profileRepository.save(profile);
    }

    public void delete(String id) {
        if (!profileRepository.existsById(id)) {
            throw new RuntimeException("Profile not found");
        }
        profileRepository.deleteById(id);
    }
}
