package com.exam.devsecops.devsecops.repository;

import com.exam.devsecops.devsecops.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
