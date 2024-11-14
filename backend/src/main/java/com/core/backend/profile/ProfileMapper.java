package com.core.backend.profile;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProfileMapper {
    ProfileMapper INSTANCE = Mappers.getMapper(ProfileMapper.class);

    @Mapping(target = "id", ignore = true)
    Profile toProfileEntity(ProfileDTO profile);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Profile updateEntityFromDto(ProfileUpdateDTO profileUpdateDTO, @MappingTarget Profile profile);
}
