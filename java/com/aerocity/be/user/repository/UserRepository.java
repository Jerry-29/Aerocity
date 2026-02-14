package com.aerocity.be.user.repository;

import com.aerocity.be.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMobile(String mobile);

    Optional<User> findByMobileAndRole(String mobile, User.UserRole role);

    boolean existsByMobile(String mobile);
}

