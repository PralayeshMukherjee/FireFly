package com.backend.FireFlyBackend.repository;

import com.backend.FireFlyBackend.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepo extends JpaRepository<UserData,Long> {
}
